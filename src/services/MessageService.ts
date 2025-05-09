import { Message } from '../models/Message';

export class MessageService {
  static async send(remetenteId: string, destinatarioId: string, conteudo: string) {
    return Message.create({ remetenteId, destinatarioId, conteudo });
  }

  static async getInbox(destinatarioId: string) {
    return Message.findAll({ where: { destinatarioId }, order: [['createdAt', 'DESC']] });
  }

  static async marcarComoLida(id: string) {
    const msg = await Message.findByPk(id);
    if (!msg) return null;
    return msg.update({ lida: true });
  }
}
