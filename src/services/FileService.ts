import { File } from '../models/File';

export class FileService {
  static async salvar(usuarioId: string, nomeOriginal: string, caminho: string, mimeType: string) {
    return File.create({ usuarioId, nomeOriginal, caminho, mimeType });
  }

  static async listar(usuarioId: string) {
    return File.findAll({ where: { usuarioId }, order: [['createdAt', 'DESC']] });
  }

  static async deletar(id: string) {
    const file = await File.findByPk(id);
    if (!file) return null;
    return file.destroy();
  }
}
