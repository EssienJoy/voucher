import express from 'express';
import {
  signUp,
  login,
  protect,
  restrictTo,
} from '../controller/authController.js';
import {
  getUser,
  getAllUsers,
  updateUser,
} from '../controller/businessController.js';

const businessRouter = express.Router();

businessRouter.post('/sign-up', signUp);
businessRouter.post('/login', login);

businessRouter.use(protect);
businessRouter.get('/', getAllUsers);
businessRouter
  .route('/me')
  .get(getUser)
  .patch(restrictTo('user'), updateUser);

export default businessRouter;
