import { Request, Response, Router } from 'express';
import User from '../models/User';

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.status(200).send({
        message: 'GET request successfulll!!!!'
    });
});

export default userRouter;