import { createConnection } from 'typeorm';

export const connectDatabase = () => {
  return createConnection();
};
