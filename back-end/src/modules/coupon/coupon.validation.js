import Joi from "joi";

export const couponSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().min(0).max(100).required(),
  expireDate: Joi.date().greater("now").required()
});