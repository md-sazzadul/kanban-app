import { useEffect } from "react";
import { useAuthStore } from "../features/auth/authStore";

const AppInitializer = ({ children }: any) => {
  const loadUser = useAuthStore((s) => s.loadUser);

  useEffect(() => {
    loadUser();
  }, []);

  return children;
};

export default AppInitializer;
