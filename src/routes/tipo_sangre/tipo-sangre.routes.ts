import { Router } from 'express';
import { Controller } from '../../controllers/tipo_sangre/tipo-sangre.controller';


const router = Router();
const controller = new Controller();
router.get('/', controller.get)


export default router;