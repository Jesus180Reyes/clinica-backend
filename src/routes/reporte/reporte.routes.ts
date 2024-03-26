import { Router } from 'express';
import { Controller } from '../../controllers/reporte/reporte.controller';

const router = Router();
const controller = new Controller();

router.get('/', controller.get)


export default router;