import { Router } from 'express';
import UserController from '../controllers/user';

const userRouter = Router();

userRouter.get('/', UserController.getAll);

export default userRouter;
