import express, { type Express } from 'express';

import errorController from './controller/errorController.js';
import businessRouter from './routes/businessRoutes.js';
import voucherRouter from './routes/voucherRoutes.js';
import AppError from '../utils/appError.js';

// console.log(new Error());
// const error = new Error();
// console.log(error.name);

const app: Express = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/api/v1/user', businessRouter);
app.use('/api/v1/voucher', voucherRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorController);
export default app;
