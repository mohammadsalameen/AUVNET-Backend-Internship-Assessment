import Router from 'express';
import * as authController from './auth.controller.js'
import asyncHandler from '../../middleware/catchError.js';
import validation from '../../middleware/validation.js';
import { loginSchema, registerSchema, resetPasswordSchema } from './auth.validation.js';
const router = Router();

router.post('/register',validation(registerSchema), asyncHandler(authController.register));
router.post('/login',validation(loginSchema), asyncHandler(authController.login));
router.post('/sendCode', asyncHandler(authController.sendCode));
router.get('/confirmEmail/:token', asyncHandler(authController.confirmEmail));
router.patch('/resetPassword',validation(resetPasswordSchema), asyncHandler(authController.resetPassword));
export default router;