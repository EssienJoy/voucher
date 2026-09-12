import express, { type Express } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
// import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import globalErrorHandler from './controller/errorController.js';
import businessRouter from './routes/businessRoutes.js';
import voucherRouter from './routes/voucherRoutes.js';
import AppError from './utils/appError.js';

const app: Express = express();

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

// app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
  //logs information about incoming requests
  app.use(morgan('dev'));
}

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

if (process.env.NODE_ENV === 'development') {
  //logs information about incoming requests
  app.use(morgan('dev'));
}

app.use(express.static('public'));
app.use('/api/v1/user', businessRouter);
app.use('/api/v1/voucher', voucherRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
export default app;
