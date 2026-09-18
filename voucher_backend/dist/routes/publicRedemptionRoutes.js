import express from 'express';
import { verifyVoucher, redeemVoucher } from '../controller/redemptionController.js';
// Scenario 3 in REDEMPTION_STRATEGY.md — no business website, no staff
// involved, a customer online redeems the code themselves. Deliberately
// unauthenticated: possession of the code is the authorization.
const publicRedemptionRouter = express.Router();
publicRedemptionRouter.get('/verify/:code', verifyVoucher);
publicRedemptionRouter.post('/redeem/:code', redeemVoucher);
export default publicRedemptionRouter;
//# sourceMappingURL=publicRedemptionRoutes.js.map