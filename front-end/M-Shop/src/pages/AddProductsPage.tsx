import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price.toString());
      formData.append("discount", discount.toString());

      await axios.post("http://localhost:3000/products/create", formData, {
        headers: {
          token: localStorage.getItem("token") || "",
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/products");
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label>Discount</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(+e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add Product
        </button>
      </form>
      <div className="mt-6">
        <Link
          to="/products/add"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add New Product
        </Link>
      </div>
    </div>
  );
};

export default AddProductPage;
