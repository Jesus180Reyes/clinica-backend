import { Router } from 'express';
import { Controller } from '../../controllers/auth/auth.controller';

const router = Router();
const controller = new Controller();
router.post('/', controller.login);
router.get('/qr', controller.qrGet);
router.post('/file', controller.uploadFile);
router.get('/encrypt', controller.encrypt);
router.post('/google', controller.googleSignIn);

export default router;
