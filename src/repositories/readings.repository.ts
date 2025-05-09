import { getRepository } from 'typeorm';
import { Reading } from '../models/reading.model';

export class ReadingsRepository {
  private repo = getRepository(Reading);

  save(reading: Partial<Reading>) {
    return this.repo.save(reading);
  }

  findRecent(limit = 10) {
    return this.repo.find({ order: { timestamp: 'DESC' }, take: limit });
  }
}
