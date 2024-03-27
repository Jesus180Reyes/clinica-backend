import { Router } from 'express';
import { Controller } from '../../controllers/historial_medico/historial_medico.controller';

const router = Router();

const controller = new Controller();

router.get('/', controller.get);

router.post('/', controller.crearHistorialMedico);

export default router;
