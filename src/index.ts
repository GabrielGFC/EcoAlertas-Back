import 'reflect-metadata';
import express from 'express';
import { connectDatabase } from './config/database';
import readingsRoute from './routes/readings.route';

const app = express();
app.use(express.json());

connectDatabase().then(() => {
  app.use('/api', readingsRoute);

  app.listen(3000, () => {
    console.log('Backend EcoAlertas rodando na porta 3000');
  });
}).catch(error => console.error('Erro ao conectar ao banco:', error));
