import Router from 'express';
import * as cartController from './cart.controller.js'
import auth from '../../middleware/auth.js';
import asyncHandler from '../../middleware/catchError.js';
const router = Router();

router.post('/add',auth(['user']), asyncHandler(cartController.addToCart));

export default router;