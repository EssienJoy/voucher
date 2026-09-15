import express from 'express';
import {
  createVoucher,
  getVoucher,
  updateVoucher,
  deleteVoucher,
} from '../controller/voucherController.js';
import {
  verifyVoucher,
  redeemVoucher,
} from '../controller/redemptionController.js';
import { protect } from '../controller/authController.js';

const voucherRouter = express.Router();

voucherRouter.use(protect);

voucherRouter.route('/').post(createVoucher).get(getVoucher);

// Scenario 2 in REDEMPTION_STRATEGY.md — staff, logged into our
// dashboard, redeeming a code a customer shows them in person. Same
// verify/redeem logic as the public and API-key surfaces, scoped to the
// logged-in business by `protect` above.
voucherRouter.get('/verify/:code', verifyVoucher);
voucherRouter.post('/redeem/:code', redeemVoucher);

voucherRouter
  .route('/:id')
  .get(getVoucher)
  .patch(updateVoucher)
  .delete(deleteVoucher);

export default voucherRouter;
