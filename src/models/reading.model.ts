import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('readings')
export class Reading {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sensorId: string;

  @Column('float')
  value: number;

  @Column()
  type: 'temperature' | 'humidity' | 'smoke' | 'heat';

  @CreateDateColumn()
  timestamp: Date;

  @Column()
  source: 'local' | 'inmet';
}
