import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import type { Category, Product } from "../types";

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:3000/products/${id}`, {
        headers: {
          token: localStorage.getItem("token") || "",
        },
      });
      const product: Product = res.data.product;
      setName(product.name);
      setPrice(product.price);
      setDiscount(product.discount);
      setCategoryId(
        typeof product.categoryId === "string" 
          ? product.categoryId 
          : product.categoryId?._id || ""
      );
    };

    const fetchCategories = async () => {
      const res = await axios.get("http://localhost:3000/categories/active");
      setCategories(res.data.categories);
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("discount", discount.toString());
    formData.append("categoryId", categoryId);

    await axios.put(`http://localhost:3000/products/update-product/${id}`, formData, {
      headers: {
        token: localStorage.getItem("token") || "",
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Product updated successfully!");
    navigate("/products");
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name</label>
          <input className="border p-2 w-full" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Price</label>
          <input type="number" className="border p-2 w-full" value={price} onChange={(e) => setPrice(+e.target.value)} required />
        </div>
        <div>
          <label>Discount (%)</label>
          <input type="number" className="border p-2 w-full" value={discount} onChange={(e) => setDiscount(+e.target.value)} />
        </div>
        <div>
          <label>Category</label>
          <select
            className="border p-2 w-full"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductPage;