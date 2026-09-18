import express from 'express';
import {
  signUp,
  login,
  logout,
  signInWithGoogle,
  getUser,
  getAllUsers,
  updateUser,
  regenerateApiKey,
} from './business.controller.js';
import { protect, restrictTo } from '../../middleware/authMiddleware.js';

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