import { File } from '../models/File';

export class FileRepository {
  static async create(data: Partial<File>) {
    return File.create(data);
  }

  static async findAllByUser(usuarioId: string) {
    return File.findAll({ where: { usuarioId }, order: [['createdAt', 'DESC']] });
  }

  static async findById(id: string) {
    return File.findByPk(id);
  }

  static async delete(id: string) {
    const file = await File.findByPk(id);
    if (!file) return null;
    await file.destroy();
    return true;
  }
}
