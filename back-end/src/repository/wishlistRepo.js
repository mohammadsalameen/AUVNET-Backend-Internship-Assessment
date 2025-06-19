import WishlistModel from "../../DB/models/wishlist.model.js";

export const findWishlistByUser = async (userId, skip = 0, limit = 0) =>  await WishlistModel.findOne({ userId})
.populate('products.productId')
.skip(skip)
.limit(limit);

export const createWishlist = async (data) => await WishlistModel.create(data);

export const updateWishlist = async (userId, update) =>
  await WishlistModel.findOneAndUpdate({ userId }, update, { new: true });