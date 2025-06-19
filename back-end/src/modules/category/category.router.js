import Router from 'express';
import * as categoryController from './category.controller.js'
import auth from '../../middleware/auth.js';
import asyncHandler from '../../middleware/catchError.js';
import validation from '../../middleware/validation.js';
import { categorySchema } from './category.validation.js';
const router = Router();

router.post('/create',auth(['admin']),validation(categorySchema), asyncHandler(categoryController.create));
router.get('/', auth(['admin', 'user']), asyncHandler(categoryController.getCategories));
router.get('/active', asyncHandler(categoryController.getActiveCategories));
router.get('/:id', asyncHandler(categoryController.getCategoryDetails));
router.put('/:id', auth(['admin']), asyncHandler(categoryController.updateCategory));
router.delete('/:id',auth(['admin']), asyncHandler(categoryController.removeCategory));

export default router;