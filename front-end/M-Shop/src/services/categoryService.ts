import axios from "axios";
import type { Category } from "../types";

const BASE_URL = "http://localhost:3000";

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data.categories;
};

export const createCategory = async (name: string, token: string): Promise<Category> => {
  const response = await axios.post(
    `${BASE_URL}/categories/create`,
    { name },
    { headers: { token } }
  );
  return response.data.category;
};