import { Router } from 'express';
import { Controller } from '../../controllers/habitacion/habitacion.controller';

const router = Router();
const controller = new Controller();

router.get('/', controller.get);

export default router;
