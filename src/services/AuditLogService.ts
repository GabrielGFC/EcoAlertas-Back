import { AuditLog } from '../models/AuditLog';

export class AuditLogService {
  static async registrar(userId: string, acao: string, detalhes: string) {
    return AuditLog.create({ userId, acao, detalhes });
  }

  static async listar(userId: string) {
    return AuditLog.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
  }
}
