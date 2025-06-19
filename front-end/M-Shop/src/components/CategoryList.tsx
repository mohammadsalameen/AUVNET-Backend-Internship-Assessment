import { useEffect, useState, useContext } from "react";
import {
  getAllCategories,
  deleteCategory,
  updateCategory,
  createCategory,
} from "../services/categoryService";
import { AuthContext } from "../contexts/AuthContext";
import type { Category } from "../types";

const CategoriesPage = () => {
  useContext(AuthContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const fetchCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!newCategory.trim()) return;
    await createCategory(newCategory, localStorage.getItem("token") || "");
    setNewCategory("");
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    await deleteCategory(id, localStorage.getItem("token") || "");
    fetchCategories();
  };

  const handleUpdate = async () => {
    if (editId && editName.trim()) {
      await updateCategory(
        editId,
        editName,
        localStorage.getItem("token") || ""
      );
      setEditId(null);
      setEditName("");
      fetchCategories();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="New category"
          className="border p-2"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul>
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="flex justify-between items-center mb-2 border p-2"
          >
            {editId === cat._id ? (
              <div className="flex gap-2 w-full">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-1 flex-grow"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-2 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span>{cat.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditId(cat._id);
                      setEditName(cat.name);
                    }}
                    className="bg-yellow-400 px-2 rounded cursor-pointer hover:bg-yellow-500 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-500 text-white px-2 rounded cursor-pointer hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;