import { Router } from 'express';
import { Controller } from '../../controllers/factura/factura.controller';

const router = Router();
const controller = new Controller();

router.get('/', controller.get);

router.get('/:id', controller.getByPacientId);

router.put('/:id', controller.actualizarFactura);

export default router;
