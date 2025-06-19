import Router from 'express';
import * as couponController from './coupon.controller.js'
import auth from '../../middleware/auth.js';
import asyncHandler from '../../middleware/catchError.js';
import validation from '../../middleware/validation.js';
import { couponSchema } from './coupon.validation.js';
const router = Router();

router.post('/create',auth(['admin']), validation(couponSchema), asyncHandler(couponController.create));

router.get('/', auth(['admin']), asyncHandler(couponController.getCoupons));

export default router;