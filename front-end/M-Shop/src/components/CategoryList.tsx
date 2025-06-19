import { useEffect, useState, useContext } from "react";
import { getAllCategories, createCategory } from "../services/categoryService";
import { AuthContext } from "../contexts/AuthContext";
import type { Category } from "../types";

const CategoryList =() => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!newCategory) return;
    try {
      await createCategory(newCategory, localStorage.getItem("token") || "");
      setNewCategory("");
      fetchCategories();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to create category");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Categories</h2>

      <ul className="mb-4">
        {categories.map((cat) => (
          <li key={cat._id} className="border p-2 mb-2">
            {cat.name} ({cat.status})
          </li>
        ))}
      </ul>

      {user?.role === "admin" && (
        <div className="flex space-x-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category"
            className="border p-2 w-full"
          />
          <button onClick={handleAdd} className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800">
            Add
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryList;