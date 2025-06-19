import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import type { ApiResponse, Product } from "../types";

const ProductsPage = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState<string>("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get<ApiResponse>(
        "http://localhost:3000/products",
        {
          headers: { token: localStorage.getItem("token") || "" },
        }
      );
      setProducts(res.data.products);
      setUserRole(res.data.userRole || "");
    } catch (error) {
      console.error("Error fetching products", error);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`http://localhost:3000/products/remove-product/${id}`, {
        headers: { token: localStorage.getItem("token") || "" },
      });
      fetchProducts();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("You are not authorized to delete this product.");
    }
  };

  const handleAddToWishlist = async (productId: string) => {
    try {
      await axios.post(
        "http://localhost:3000/wishlists/add",
        { productId: String(productId) }, 
        { headers: { token: localStorage.getItem("token") || "" } }
      );
      alert("Product added to wishlist successfully.");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.status === 409) {
        alert("Product already in wishlist.");
      } else {
        alert("Failed to add product to wishlist.");
      }
    }
  };
  

  if (loading) return <div className="p-4">Loading products...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        {user && (
          <Link
            to="/products/add"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
          >
            Add Product
          </Link>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products available</p>
          {user && (
            <Link
              to="/products/add"
              className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
            >
              Add your first product
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const createdById = typeof product.createdBy === "string"
              ? product.createdBy
              : product.createdBy?._id;

            const canEdit = userRole === "admin" || (user && createdById === user.id);

            return (
              <div key={product._id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white">
                <div className="relative pb-[75%] mb-3 overflow-hidden rounded">
                  <img
                    src={product.mainImage?.secure_url || "/placeholder-product.png"}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-product.png";
                    }}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                {product.categoryId && (
                  <p className="text-sm text-gray-500 mb-2">
                    {product.categoryId.name}
                  </p>
                )}
                <div className="my-2">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-gray-500 line-through mr-2">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-green-600 font-bold">
                        ${ (product.price - product.price * (product.discount / 100)).toFixed(2) }
                      </span>
                      <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                        {product.discount}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="font-medium">${product.price.toFixed(2)}</span>
                  )}
                </div>
                {product.createdBy && (
                  <p className="text-xs text-gray-400 mt-1">
                    Added by: {typeof product.createdBy === 'string'
                      ? 'User ID: ' + product.createdBy
                      : product.createdBy?.username || 'System'}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAddToWishlist(product._id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Add to Wishlist
                  </button>
                  {canEdit && (
                    <>
                      <Link
                        to={`/products/edit/${product._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;