import { createWishlist, findWishlistByUser, updateWishlist } from "../../repository/wishlistRepo.js";

export const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  
  const wishlist = await findWishlistByUser(req.id);

  if (!wishlist) {
    const newWishlist = await createWishlist({
      userId: req.id,
      products: [{ productId }]
    });
    return res.status(201).json({ message: "success", wishlist: newWishlist });
  }

  const exists = wishlist.products.some(p => String(p.productId) === productId);
  if (exists) {
    return res.status(409).json({ message: "Product already in wishlist" });
  }

  wishlist.products.push({ productId });
  await wishlist.save();
  return res.status(201).json({ message: "success", wishlist });
};

export const getWishlist = async (req, res) => {
  const wishlist = await findWishlistByUser(req.id);
  return res.status(200).json({ message: "success", wishlist });
};

export const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const wishlist = await updateWishlist(req.id, {
    $pull: { products: { productId } }
  });
  return res.status(200).json({ message: "success", wishlist });
};