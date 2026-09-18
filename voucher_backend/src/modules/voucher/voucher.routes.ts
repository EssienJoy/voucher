import express from 'express';
import {
  createVoucher,
  getVoucher,
  updateVoucher,
  deleteVoucher,
} from './voucher.controller.js';
import {
  verifyVoucher,
  redeemVoucher,
} from '../redemption/redemption.controller.js';
import { protect } from '../../middleware/authMiddleware.js';

const voucherRouter = express.Router();

voucherRouter.use(protect);

voucherRouter.route('/').post(createVoucher).get(getVoucher);

voucherRouter.get('/verify/:code', verifyVoucher);
voucherRouter.post('/redeem/:code', redeemVoucher);

voucherRouter
  .route('/:id')
  .get(getVoucher)
  .patch(updateVoucher)
  .delete(deleteVoucher);

export default voucherRouter;
