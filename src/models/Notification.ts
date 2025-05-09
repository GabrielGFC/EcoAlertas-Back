import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, Default
} from 'sequelize-typescript';
import { User } from './User';

@Table({ tableName: 'notifications', timestamps: true })
export class Notification extends Model<Notification> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId!: string;

  @Column(DataType.STRING)
  titulo!: string;

  @Column(DataType.TEXT)
  descricao!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  lida!: boolean;

  @BelongsTo(() => User)
  usuario!: User;
}