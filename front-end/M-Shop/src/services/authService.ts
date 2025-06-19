import axios from "axios";
import type { LoginPayload, RegisterPayload } from "../types";

const BASE_URL = "http://localhost:3000";

export const register = async (data: RegisterPayload) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, data);
  return response.data;
};

export const login = async (data: LoginPayload) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);
    return response.data;
  };