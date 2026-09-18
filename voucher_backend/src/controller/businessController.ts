import { type NextFunction, type Request, type Response } from 'express';
import Business, { type BusinessDocument } from '../model/businessModel.js';
import ApiFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';
import { generateApiKey } from '../utils/apiKey.js';

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const business = await Business.findById(req.user?.id).select(
      'business_name email createdAt apiKeyPrefix -_id',
    );

    res.status(200).json({
      status: 'success',
      data: business,
    });
  } catch (err) {
    next(err);
  }
};

// export const getUser = async (req:Request, res:Response, next:NextFunction) => {
//   req.params.id = req.user.id;
//   next();
// };

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const business = await Business.findByIdAndUpdate(
      req.user?.id,
      { business_name: req.body.business_name },
      { returnDocument: 'after', runValidators: true },
    ).select('business_name email createdAt apiKeyPrefix -_id');

    res.status(200).json({
      status: 'success',
      data: business,
    });
  } catch (err) {
    next(err);
  }
};

export const regenerateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { rawKey, hash, prefix } = generateApiKey();

    await Business.findByIdAndUpdate(req.user?.id, {
      apiKeyHash: hash,
      apiKeyPrefix: prefix,
    });

    res.status(200).json({
      status: 'success',
      message: 'Save this key now — it will not be shown again.',
      data: { apiKey: rawKey, apiKeyPrefix: prefix },
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // GET /user/:id — fetch a single business by id (e.g. admin lookup).
    if (req.params.id) {
      const business = await Business.findById(req.params.id).select(
        'business_name email createdAt -_id',
      );

      if (!business) {
        return next(new AppError('No business found with that ID', 404));
      }

      res.status(200).json({
        status: 'success',
        data: business,
      });
      return;
    }

    const features = new ApiFeatures<BusinessDocument>(
      Business.find(),
      req.query,
    )
      .filter()
      .sort()
      .limit()
      .pagination();

    const businesses = await features.query;

    res.status(200).json({
      status: 'success',
      data: businesses,
      length: businesses.length,
    });
  } catch (err) {
    next(err);
  }
};
