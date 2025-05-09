import {
  Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey, BelongsTo
} from 'sequelize-typescript';
import { User } from './User';

@Table({ tableName: 'files', timestamps: true })
export class File extends Model<File> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column(DataType.STRING)
  nomeOriginal!: string;

  @Column(DataType.STRING)
  caminho!: string;

  @Column(DataType.STRING)
  mimeType!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  usuarioId!: string;

  @BelongsTo(() => User)
  usuario!: User;
}