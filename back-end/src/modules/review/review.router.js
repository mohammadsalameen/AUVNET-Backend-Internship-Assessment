import Router from 'express';
import * as reviewController from './review.controller.js'
import auth from '../../middleware/auth.js';
import asyncHandler from '../../middleware/catchError.js';
import validation from '../../middleware/validation.js';
import { reviewSchema } from './review.validation.js';
const router = Router({mergeParams: true});

router.post('/',auth(['user']),validation(reviewSchema), asyncHandler(reviewController.create));

export default router;