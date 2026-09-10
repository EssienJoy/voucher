import express from 'express';
import { createVoucher, getVoucher, updateVoucher, deleteVoucher, } from '../controller/voucherController.js';
import { protect } from '../controller/authController.js';
const voucherRouter = express.Router();
voucherRouter.use(protect);
voucherRouter.route('/').post(createVoucher).get(getVoucher);
voucherRouter.route('/:id').patch(updateVoucher).delete(deleteVoucher);
export default voucherRouter;
//# sourceMappingURL=voucherRoutes.js.map