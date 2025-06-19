import { Navigate } from "react-router-dom";
import { useContext, type JSX } from "react";
import { AuthContext } from "../contexts/AuthContext";

interface Props {
  children: JSX.Element;
  allowedRoles?: string[]; 
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;