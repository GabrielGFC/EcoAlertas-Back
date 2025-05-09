import { User } from '../models/User';

export class UserService {
  static async create(data: Partial<User>) {
    return User.create(data);
  }

  static async findById(id: string) {
    return User.findByPk(id);
  }

  static async findAll() {
    return User.findAll();
  }

  static async update(id: string, data: Partial<User>) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user.update(data);
  }

  static async delete(id: string) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return true;
  }
}
