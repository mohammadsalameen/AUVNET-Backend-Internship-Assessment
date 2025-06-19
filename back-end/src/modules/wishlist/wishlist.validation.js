import Joi from "joi";

export const addToWishlistSchema = Joi.object({
  productId: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/)
});