import { Router } from 'express';
import { Controller } from '../../controllers/auth/auth.controller';

const router = Router();
const controller = new Controller();
router.post('/', controller.login);
router.get('/qr', controller.qrGet);

export default router;
