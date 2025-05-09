import { Message } from '../models/Message';

export class MessageRepository {
  static async create(data: Partial<Message>) {
    return Message.create(data);
  }

  static async findInbox(destinatarioId: string) {
    return Message.findAll({ where: { destinatarioId }, order: [['createdAt', 'DESC']] });
  }

  static async findById(id: string) {
    return Message.findByPk(id);
  }

  static async update(id: string, data: Partial<Message>) {
    const msg = await Message.findByPk(id);
    if (!msg) return null;
    return msg.update(data);
  }

  static async delete(id: string) {
    const msg = await Message.findByPk(id);
    if (!msg) return null;
    await msg.destroy();
    return true;
  }
}
