import {
  Table, Column, Model, DataType, PrimaryKey, Default, Unique
} from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  nome!: string;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false, validate: { isEmail: true } })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  senhaHash!: string;

  @Column({ type: DataType.ENUM('admin', 'usuario', 'gestor'), defaultValue: 'usuario' })
  role!: 'admin' | 'usuario' | 'gestor';

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  ativo!: boolean;
}