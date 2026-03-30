import { create } from "zustand";
import { loginUser } from "../../services/auth";

type User = {
  id: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  loading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUser: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });

      const user = await loginUser(email, password);

      const safeUser = { id: user.id, email: user.email };

      localStorage.setItem("user", JSON.stringify(safeUser));

      set({ user: safeUser, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },

  loadUser: () => {
    const stored = localStorage.getItem("user");
    if (stored) {
      set({ user: JSON.parse(stored) });
    }
  },
}));
