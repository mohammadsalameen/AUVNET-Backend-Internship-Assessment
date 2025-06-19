import { useState } from "react";
import { register } from "../services/authService";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register(formData);
      console.log(res);
      alert("Registered successfully");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
      console.error(error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 space-y-4">
      <input
        type="text"
        name="userName"
        placeholder="Username"
        value={formData.userName}
        onChange={handleChange}
        className="border p-2 w-full"
      />
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
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
