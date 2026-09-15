import express from 'express';
import { verifyVoucher, redeemVoucher, } from '../controller/redemptionController.js';
import { apiKeyAuth } from '../middleware/apiKeyAuth.js';
const publicApiRouter = express.Router();
publicApiRouter.use(apiKeyAuth);
publicApiRouter.get('/vouchers/verify/:code', verifyVoucher);
publicApiRouter.post('/vouchers/redeem/:code', redeemVoucher);
export default publicApiRouter;
//# sourceMappingURL=publicApiRoutes.js.map