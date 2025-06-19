import mongoose, { model, Schema, Types } from "mongoose";

const wishlistSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  products: [
    {
      productId: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });

const WishlistModel = mongoose.models.Wishlist || model('Wishlist', wishlistSchema);
export default WishlistModel;