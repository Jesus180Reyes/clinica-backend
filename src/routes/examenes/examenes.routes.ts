import { Router } from 'express';
import { Controller } from '../../controllers/examenes/examenes.controller';


const router = Router();
const controller = new Controller();
router.get('/', controller.get)
router.get('/resultados', controller.getResultadosExamenes)
router.post('/', controller.crearExamenResultado)


export default router;