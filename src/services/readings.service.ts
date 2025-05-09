import { ReadingsRepository } from '../repositories/readings.repository';
import { Reading } from '../models/reading.model';

export class ReadingsService {
  constructor(private repo = new ReadingsRepository()) {}

  async addReading(data: Partial<Reading>) {
    return this.repo.save(data);
  }

  async getRecent() {
    return this.repo.findRecent();
  }
}
