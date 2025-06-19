import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import CategoryList from "./components/CategoryList";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductsPage";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import EditProductPage from "./pages/EditProductPage";

function AppContent() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div>Welcome to protected dashboard</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CategoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/add"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoute>
              <EditProductPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
