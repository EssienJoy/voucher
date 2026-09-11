import express from 'express';
import { signUp, login, logout, protect, restrictTo, } from '../controller/authController.js';
import { getUser, getAllUsers, updateUser, } from '../controller/businessController.js';
const businessRouter = express.Router();
businessRouter.post('/sign-up', signUp);
businessRouter.post('/login', login);
businessRouter.post('/logout', logout);
businessRouter.use(protect);
businessRouter.get('/', getAllUsers);
businessRouter
    .route('/me')
    .get(getUser)
    .patch(restrictTo('user'), updateUser);
businessRouter.get('/:id', getAllUsers);
export default businessRouter;
//# sourceMappingURL=businessRoutes.js.map