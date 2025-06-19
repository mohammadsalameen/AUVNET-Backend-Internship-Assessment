import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center px-4 py-2">
      <div className="text-lg font-bold">
        <Link to={user ? "/dashboard" : "/"} className="hover:text-blue-300">
          M Shop
        </Link>
      </div>

      {user ? (
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="hover:text-blue-300">Dashboard</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/products" className="hover:text-blue-300">Products</Link>
          {user.role === "admin" && (
            <Link to="/categories" className="hover:text-blue-300">Categories</Link>
          )}
          <span className="font-semibold">Welcome {user.userName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-x-4">
          <Link to="/login" className="hover:text-blue-300">Login</Link>
          <Link to="/register" className="hover:text-blue-300">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
