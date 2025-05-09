import { AuditLog } from '../models/AuditLog';

export class AuditLogRepository {
  static async create(data: Partial<AuditLog>) {
    return AuditLog.create(data);
  }

  static async findAllByUser(userId: string) {
    return AuditLog.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
  }

  static async findById(id: string) {
    return AuditLog.findByPk(id);
  }
}
