import express from 'express';
import { verifyVoucher, redeemVoucher, } from '../controller/redemptionController.js';
const redeemRouter = express.Router();
redeemRouter.get('/verify-voucher/:code', verifyVoucher);
redeemRouter.post('/redeem-voucher/:code', redeemVoucher);
export default redeemRouter;
//# sourceMappingURL=redeemRoutes.js.map