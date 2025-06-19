import Joi from "joi";

export const addToWishlistSchema = Joi.object({
  productId: Joi.string().required()
});