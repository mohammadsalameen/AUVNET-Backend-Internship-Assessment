import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const EditProductPage = () => {
  const { id } = useParams(); 
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/products/${id}`, {
          headers: {
            token: localStorage.getItem("token") || "",
          },
        });

        const product = res.data.product;
        setName(product.name);
        setPrice(product.price);
        setDiscount(product.discount || 0);
        setLoading(false);
      } catch (error) {
        console.error("Error loading product:", error);
        alert("Failed to load product.");
        navigate("/products");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("discount", discount.toString());
  
    await axios.put(`http://localhost:3000/products/update-product/${id}`, formData, {
      headers: {
        token: localStorage.getItem("token") || "",
        "Content-Type": "multipart/form-data"
      }
    });
  
    alert("Product updated successfully!");
    navigate("/products");
  };
  

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 ">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Discount (%)</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value ? +e.target.value : 0)}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800" >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;