import { useState, useContext } from "react";
import { login } from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

const LoginForm = () => {
  const { login: loginContext } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      loginContext(res.token); 
      alert("Logged in successfully");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer">
        Login
      </button>
    </form>
  );
}

export default LoginForm;