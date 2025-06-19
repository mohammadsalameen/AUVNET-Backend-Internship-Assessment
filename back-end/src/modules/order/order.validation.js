import Joi from "joi";

export const createOrderSchema = Joi.object({
  couponName: Joi.string().optional(),
  address: Joi.string().optional(),
  phoneNumber: Joi.string().optional(),
  paymentMethod: Joi.string().valid("cash", "card").optional(),
  note: Joi.string().optional()
});