import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, Default
} from 'sequelize-typescript';
import { User } from './User';

@Table({ tableName: 'messages', timestamps: true })
export class Message extends Model<Message> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  remetenteId!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  destinatarioId!: string;

  @Column(DataType.TEXT)
  conteudo!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  lida!: boolean;

  @BelongsTo(() => User, 'remetenteId')
  remetente!: User;

  @BelongsTo(() => User, 'destinatarioId')
  destinatario!: User;
}