import { Navigate } from "react-router";
import { useAuthStore } from "../features/auth/authStore";

const ProtectedRoute = ({ children }: any) => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
