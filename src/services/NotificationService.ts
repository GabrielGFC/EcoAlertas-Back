import { Notification } from '../models/Notification';

export class NotificationService {
  static async criar(userId: string, titulo: string, descricao: string) {
    return Notification.create({ userId, titulo, descricao });
  }

  static async listar(userId: string) {
    return Notification.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
  }

  static async marcarComoLida(id: string) {
    const n = await Notification.findByPk(id);
    if (!n) return null;
    return n.update({ lida: true });
  }

  static async deletar(id: string) {
    const n = await Notification.findByPk(id);
    if (!n) return null;
    return n.destroy();
  }
}
