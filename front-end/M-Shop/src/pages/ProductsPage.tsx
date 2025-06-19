import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import type { Product } from "../types";


const ProductsPage = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products", {
        headers: {
          token: localStorage.getItem("token") || "",
        },
      });
      setProducts(res.data.products);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/products/remove-product/${id}`, {
        headers: {
          token: localStorage.getItem("token") || "",
        },
      });
      fetchProducts();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error : any) {
      alert("You are not authorized to delete this product.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid gap-4">
        {products.map((product) => {
          const isOwner = product.createdBy === user?.id;
          const isAdmin = user?.role === "admin";
          const canEdit = isAdmin || isOwner;

          return (
            <div
              key={product._id}
              className="border p-4 rounded shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Discount: {product.discount}%</p>
              </div>

              {canEdit && (
                <div className="space-x-2">
                  <Link
                    to={`/products/edit/${product._id}`}
                    className="bg-gray-700 text-white px-3 py-1 rounded cursor-pointer hover:bg-gray-800"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
