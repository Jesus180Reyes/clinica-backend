import { Router } from 'express';
import { Controller } from '../../controllers/roles_trabajadores/roles_trabajadores.controller';

const router = Router();
const controller = new Controller();

router.get('/', controller.get);

export default router;
