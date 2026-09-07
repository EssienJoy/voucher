import express from 'express';
import { signUp, login } from '../controller/authController.js';
import { getUser, getAllUsers } from '../controller/businessController.js';

const businessRouter = express.Router();

businessRouter.post('/sign-up', signUp);
businessRouter.post('/login', login);
businessRouter.get('/', getAllUsers);
businessRouter.get('/:id', getUser);

export default businessRouter;
