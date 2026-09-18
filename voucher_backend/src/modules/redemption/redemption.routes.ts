import express from 'express';
import {
  verifyVoucher,
  redeemVoucher,
} from './redemption.controller.js';
import { apiKeyAuth } from '../../middleware/apiKeyAuth.js';

const redeemRouter = express.Router();

redeemRouter.get('/verify-voucher/:code', verifyVoucher);
redeemRouter.post('/redeem-voucher/:code', redeemVoucher);

const publicApiRouter = express.Router();

publicApiRouter.use(apiKeyAuth);

publicApiRouter.get('/vouchers/verify/:code', verifyVoucher);
publicApiRouter.post('/vouchers/redeem/:code', redeemVoucher);

export { redeemRouter, publicApiRouter };