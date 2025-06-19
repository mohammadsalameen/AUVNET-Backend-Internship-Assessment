import Joi from "joi";

export const registerSchema = Joi.object({
  userName: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  gender: Joi.string().valid("male", "female"),
  phone: Joi.string(),
  address: Joi.string()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().required(),
  password: Joi.string().min(4).required()
});