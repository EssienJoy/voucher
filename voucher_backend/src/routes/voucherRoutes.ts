import express from 'express';
import {
  createVoucher,
  getVoucher,
  updateVoucher,
  deleteVoucher,
} from '../controller/voucherController.js';

const voucherRouter = express.Router();

voucherRouter.route('/').post(createVoucher).get(getVoucher);

voucherRouter.route('/:id').patch(updateVoucher).delete(deleteVoucher);

export default voucherRouter;
