import { Notification } from '../models/Notification';

export class NotificationRepository {
  static async create(data: Partial<Notification>) {
    return Notification.create(data);
  }

  static async findAllByUser(userId: string) {
    return Notification.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
  }

  static async findById(id: string) {
    return Notification.findByPk(id);
  }

  static async update(id: string, data: Partial<Notification>) {
    const noti = await Notification.findByPk(id);
    if (!noti) return null;
    return noti.update(data);
  }

  static async delete(id: string) {
    const noti = await Notification.findByPk(id);
    if (!noti) return null;
    await noti.destroy();
    return true;
  }
}
