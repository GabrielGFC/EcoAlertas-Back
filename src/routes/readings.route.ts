import { Router } from 'express';
import { ReadingsController } from '../controllers/readings.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const controller = new ReadingsController();
const router = Router();

router.post('/readings', authMiddleware, (req, res) => controller.create(req, res));
router.get('/readings', authMiddleware, (req, res) => controller.list(req, res));

export default router;
