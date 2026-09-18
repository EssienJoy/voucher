import express, { type Express } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { env } from './config/env.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import globalErrorHandler from './controller/errorController.js';
import businessRouter from './routes/businessRoutes.js';
import voucherRouter from './routes/voucherRoutes.js';
import redeemRouter from './routes/redeemRoutes.js';
import publicApiRouter from './routes/publicApiRoutes.js';
import AppError from './utils/appError.js';

const app: Express = express();

// Frontend urls allowed to communicate to the server.
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://voucherly-three.vercel.app'],
    credentials: true,
  }),
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);

//logs information about incoming requests
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limits spam requests
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this Ip, please try again in 1 hour',
});

app.use('/api', limiter);

// Modifies incoming requests
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(compression());
app.use(express.static('public'));

//Routes
app.use('/api/v1/user', businessRouter);
app.use('/api/v1/voucher', voucherRouter);
app.use('/api/v1/redeem', redeemRouter);
app.use('/api/v1/public', publicApiRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
export default app;
