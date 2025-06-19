import Router from 'express';
import * as productController from './product.controller.js'
import auth from '../../middleware/auth.js';
import fileUpload, { fileValidation } from '../../utils/multer.js';
import reviewRouter from '../review/review.router.js';
import asyncHandler from '../../middleware/catchError.js';
import validation from '../../middleware/validation.js';
import { productSchema } from './product.validation.js';
const router = Router();
router.use('/:productId/reviews', reviewRouter);

router.post('/create', auth(['admin', 'user']), fileUpload(fileValidation.image).fields([
    {name : 'mainImage', maxCount : 1},
    {name : 'subImages', maxCount : 4}
]),validation(productSchema), asyncHandler(productController.create));

router.get('/', auth(['admin']), asyncHandler(productController.getProducts));
router.get('/:id', auth(['admin']), asyncHandler(productController.getProductDetails));

router.put('/update-product/:id', auth(['admin', 'user']), fileUpload(fileValidation.image).fields([
    {name : 'mainImage', maxCount : 1},
    {name : 'subImages', maxCount : 4}
]), asyncHandler(productController.updateProduct));
router.delete('/remove-product/:id', auth(['admin', 'user']), asyncHandler(productController.deleteProduct));


export default router;