import { Router } from 'express';
import { Controller } from '../../controllers/user/user.controllers';
const router = Router();
const userController = new Controller();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);

router.get('/get/pacientes/auxiliar-medico', userController.getUsersByAuxiliarDoctor);

router.get('/get/pacientes/doctor', userController.getUsersByDoctor);

export default router;
