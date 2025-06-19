import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  description: Joi.string().required(),
  price: Joi.string().min(0).required(),
  discount: Joi.number().min(0).max(100).optional(),
  stock: Joi.number().min(0).optional(),
  categoryId: Joi.string().required(),
  colors: Joi.array().items(Joi.string()).optional(),
  sizes: Joi.array().items(Joi.string().valid('small', 'medium', 'large', 'xlarge')).optional()
});