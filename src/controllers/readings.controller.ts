import { Request, Response } from 'express';
import { ReadingsService } from '../services/readings.service';

const service = new ReadingsService();

export class ReadingsController {
  async create(req: Request, res: Response) {
    const reading = await service.addReading(req.body);
    res.status(201).json(reading);
  }

  async list(req: Request, res: Response) {
    const list = await service.getRecent();
    res.json(list);
  }
}
