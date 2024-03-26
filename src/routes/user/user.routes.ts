import { Router } from 'express';
import { Controller } from '../../controllers/user/user.controllers';
const router = Router();
const userController = new Controller();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);

export default router;
