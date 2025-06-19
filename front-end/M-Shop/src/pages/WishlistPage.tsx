import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import type { Wishlist, Product } from "../types";

const WishlistPage = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/wishlists", {
        headers: { token: localStorage.getItem("token") || "" },
      });
      setWishlist(res.data.wishlist);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      setError("Failed to load wishlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const handleRemove = async (productId: string) => {
    if (!window.confirm("Are you sure you want to remove this product?")) return;
    try {
      await axios.delete(`http://localhost:3000/wishlists/remove/${productId}`, {
        headers: { token: localStorage.getItem("token") || "" },
      });
      fetchWishlist();
    } catch (err) {
      console.error("Error removing product:", err);
      alert("Failed to remove product. Please try again.");
    }
  };

  if (!user) return <div className="p-4">Please login to view your wishlist</div>;
  if (loading) return <div className="p-4">Loading wishlist...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      {!wishlist || wishlist.products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products in your wishlist</p>
          <Link to="/products" className="text-blue-500 hover:text-blue-700 mt-2 inline-block">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.products.map((item) => {
            const product = item.productId as unknown as Product;
            return (
              <div key={product._id} className="border p-4 rounded-lg shadow-md">
                <div className="relative pb-[75%] mb-3 overflow-hidden rounded">
                  <img
                    src={product.mainImage?.secure_url || "/placeholder-product.png"}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="my-2">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-gray-500 line-through mr-2">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-green-600 font-bold">
                        ${(product.priceAfterDiscount || product.price).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span>${product.price.toFixed(2)}</span>
                  )}
                </div>
                <button
                  onClick={() => handleRemove(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm w-full mt-2 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;