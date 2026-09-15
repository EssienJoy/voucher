import express from 'express';
import {
  signUp,
  login,
  logout,
  protect,
  restrictTo,
  signInWithGoogle,
} from '../controller/authController.js';
import {
  getUser,
  getAllUsers,
  updateUser,
  regenerateApiKey,
} from '../controller/businessController.js';

const businessRouter = express.Router();

businessRouter.post('/sign-up', signUp);
businessRouter.post('/login', login);
businessRouter.post('/logout', logout);
businessRouter.get('/google', signInWithGoogle);

businessRouter.use(protect);
businessRouter.get('/', getAllUsers);
businessRouter.route('/me').get(getUser).patch(restrictTo('user'), updateUser);
businessRouter.post('/me/api-key', regenerateApiKey);

businessRouter.get('/:id', getAllUsers);

export default businessRouter;
