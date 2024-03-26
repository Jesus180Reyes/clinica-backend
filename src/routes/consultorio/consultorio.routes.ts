import { Router } from 'express';
import { Controller } from '../../controllers/consultorio/consultorio.controller';
const router = Router();
const userController = new Controller();

router.get('/', userController.get);
router.post('/', userController.post);

export default router;
