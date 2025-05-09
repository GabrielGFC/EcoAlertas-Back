# EcoAlertas

> Sistema integrado de monitoramento ambiental em tempo real

---

## Sumário

1. [Objetivo do Sistema](#objetivo-do-sistema)  
2. [Funcionalidades Principais](#funcionalidades-principais)  
3. [Classe Principal](#classe-principal)  

---

## Objetivo do Sistema

O **EcoAlertas** é um sistema integrado de monitoramento ambiental em tempo real, desenvolvido para:

- **Coletar e processar dados ambientais** (temperatura, umidade, fumaça, calor) de sensores IoT e fontes públicas (INMET).  
- **Gerar alertas automáticos** de riscos (incêndios, enchentes, geadas) com base em regras configuráveis.  
- **Exibir dashboards interativos** para visualização imediata das condições e histórico de leituras.  
- **Facilitar ações preventivas e de resposta** por parte de órgãos governamentais, ONGs e comunidades vulneráveis.  

---

## Funcionalidades Principais

1. **Ingestão de Dados em Tempo Real**  
   - Endpoint unificado:  
     ```http
     POST /api/readings
     ```
   - Validação e persistência automática em PostgreSQL.

2. **Motor de Regras para Alertas**  
   - Definição de thresholds customizados (ex.: `temp > 45°C`).  
   - Disparo de notificações por Web Push e e-mail quando ultrapassados.

3. **Dashboard Interativo**  
   - Lista paginada das leituras mais recentes.  
   - Gráficos de série temporal e mapa de estações (Leaflet.js).

4. **Autenticação e Perfis de Acesso**  
   - JWT para `Admin`, `Operador` e `Leitor`.  
   - Controle de acesso a endpoints e configurações.

5. **Integração com INMET**  
   - Job diário de sincronização de estações oficiais.  
   - Unificação de leituras locais e INMET.

6. **Relatórios e Exportação**  
   - Geração de PDF/CSV para períodos diários, semanais e mensais.  
   - Envio automático por e-mail a stakeholders.

---

## Classe Principal

Abaixo, a **classe do sistema** (`EcoAlertasSystem`) representa o fluxo central de coleta, processamento e alerta:

```typescript
class EcoAlertasSystem {
  constructor(
    private sensorClients: SensorClient[],
    private inmetClient: InmetClient,
    private db: Database,
    private ruleEngine: RuleEngine,
    private notifier: Notifier
  ) {}

  /** Coleta leituras de sensores e INMET */
  async collectAll(): Promise<Reading[]> {
    const local = await Promise.all(this.sensorClients.map(c => c.fetch()));
    const inmet  = await this.inmetClient.fetchDaily();
    return [...local, ...inmet];
  }

  /** Processa, armazena e avalia alertas */
  async process(): Promise<void> {
    const readings = await this.collectAll();
    await this.db.saveReadings(readings);
    
    for (const r of readings) {
      if (this.ruleEngine.evaluate(r)) {
        await this.notifier.notify(r);
      }
    }
  }

  /** Gera dados para o dashboard */
  async getDashboardData(params: DashboardParams): Promise<DashboardData> {
    return this.db.queryDashboard(params);
  }
}

// Exemplo de uso:
const system = new EcoAlertasSystem(
  [new LocalSensorClient(), /* ... */],
  new InmetClient(),
  new PostgresDatabase(),
  new ThresholdRuleEngine(),
  new PushAndEmailNotifier()
);

setInterval(() => system.process(), 15 * 60 * 1000); // a cada 15 minutos
