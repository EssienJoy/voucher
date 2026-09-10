import {} from 'express';
import Business from '../model/businessModel.js';
export const getUser = async (req, res, next) => {
    try {
        const business = await Business.findById(req.user?.id);
        res.status(200).json({
            status: 'success',
            data: business,
        });
    }
    catch (err) {
        next(err);
    }
};
export const updateUser = async (req, res, next) => {
    try {
        const business = await Business.findByIdAndUpdate(req.user?.id, { business_name: req.body.business_name }, { new: true, runValidators: true });
        res.status(200).json({
            status: 'success',
            data: business,
        });
    }
    catch (err) {
        next(err);
    }
};
export const getAllUsers = async (req, res, next) => {
    try {
        const businesses = await Business.find();
        res.status(200).json({
            status: 'success',
            data: businesses,
        });
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=businessController.js.map