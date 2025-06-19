import Router from 'express';
import * as orderController from './order.controller.js'
import auth from '../../middleware/auth.js';
import asyncHandler from '../../middleware/catchError.js';
import validation from '../../middleware/validation.js';
import { createOrderSchema } from './order.validation.js';
const router = Router();

router.post('/create',auth(['user']), validation(createOrderSchema), asyncHandler(orderController.create));
router.get('/',auth(['user']), asyncHandler(orderController.getUserOrder));
router.get('/:status',auth(['admin']), asyncHandler(orderController.getOrdersByStatus));
router.patch('/changeStatus/:orderId', auth(['admin']), asyncHandler(orderController.changeOrderStatus));

export default router;