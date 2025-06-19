import axios from "axios";

export const getAllCategories = async () => {
  const token = localStorage.getItem("token") || "";
  const res = await axios.get("http://localhost:3000/categories", {
    headers: { token }
  });
  return res.data.categories;
};

export const createCategory = async (name: string, token: string) => {
  await axios.post("http://localhost:3000/categories/create", { name }, {
    headers: { token }
  });
};

export const updateCategory = async (id: string, name: string, token: string) => {
  await axios.put(`http://localhost:3000/categories/${id}`, { name }, {
    headers: { token }
  });
};

export const deleteCategory = async (id: string, token: string) => {
  await axios.delete(`http://localhost:3000/categories/${id}`, {
    headers: { token }
  });
};