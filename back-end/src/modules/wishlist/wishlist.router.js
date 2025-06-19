import Router from 'express';
import * as wishlistController from './wishlist.controller.js';
import auth from '../../middleware/auth.js';
import asyncHandler from '../../middleware/catchError.js';
import validation from '../../middleware/validation.js';
import { addToWishlistSchema } from './wishlist.validation.js';

const router = Router();

router.post('/add', auth(['user']),validation(addToWishlistSchema), asyncHandler(wishlistController.addToWishlist));
router.get('/', auth(['user']), asyncHandler(wishlistController.getWishlist));
router.delete('/remove/:productId', auth(['user']), asyncHandler(wishlistController.removeFromWishlist));

export default router;