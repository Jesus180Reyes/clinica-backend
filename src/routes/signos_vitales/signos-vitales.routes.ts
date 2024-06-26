import { Router } from 'express';
import { Controller } from '../../controllers/signos_vitales/signos-vitales.controller';

const router = Router();
const controller = new Controller();
router.get('/', controller.get);
router.post('/', controller.crearSignosVitales);
router.put('/:id', controller.actualizarStatus);

export default router;
