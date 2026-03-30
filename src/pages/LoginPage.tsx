import { useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useAuthStore } from "../features/auth/authStore";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginPage = () => {
  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const result = schema.safeParse(form);

    if (!result.success) {
      alert("Invalid input");
      return;
    }

    await login(form.email, form.password);

    if (!useAuthStore.getState().error) {
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white w-full py-2"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
