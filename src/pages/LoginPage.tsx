import { useState } from "react";
import { useNavigate } from "react-router";
import z from "zod";
import { useAuthStore } from "../features/auth/authStore";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginPage = () => {
  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);
  const loading = useAuthStore((s) => s.loading);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    const result = schema.safeParse(form);
    if (!result.success) {
      alert("Please enter a valid email and password (min 6 chars)");
      return;
    }
    await login(form.email, form.password);
    if (!useAuthStore.getState().error) {
      navigate("/");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0f] overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="login-orb-1 absolute w-125 h-125 -top-24 -left-24 rounded-full opacity-15 blur-[80px]"
          style={{
            background: "radial-gradient(circle, #4f6ef7, transparent)",
          }}
        />
        <div
          className="login-orb-2 absolute w-100 h-100 -bottom-20 -right-20 rounded-full opacity-15 blur-[80px]"
          style={{
            background: "radial-gradient(circle, #7c3aed, transparent)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Card */}
      <div className="login-card relative z-10 w-full max-w-100 mx-4 rounded-[20px] px-10 py-11 backdrop-blur-xl border border-white/8 bg-white/4 shadow-[0_24px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-9.5 h-9.5 rounded-[10px] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(79,110,247,0.4)] bg-linear-to-br from-[#4f6ef7] to-[#7c3aed] shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="3"
                width="7"
                height="18"
                rx="1.5"
                fill="currentColor"
                opacity="0.9"
              />
              <rect
                x="14"
                y="3"
                width="7"
                height="11"
                rx="1.5"
                fill="currentColor"
                opacity="0.6"
              />
              <rect
                x="14"
                y="18"
                width="7"
                height="3"
                rx="1.5"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
          </div>
          <span className="text-lg font-semibold text-white/90 tracking-tight">
            Kanban
          </span>
        </div>

        <h1 className="text-[26px] font-semibold text-white/95 tracking-tight mb-1.5">
          Welcome back
        </h1>
        <p className="text-sm text-white/40 mb-8">Sign in to your workspace</p>

        <div className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-[0.4px] text-white/50">
              Email
            </label>
            <input
              type="email"
              className="w-full px-3.5 py-3 rounded-[10px] bg-white/6 border border-white/10 text-white/90 text-sm placeholder:text-white/20 outline-none transition-all focus:border-[#4f6ef7]/70 focus:bg-[#4f6ef7]/8 focus:shadow-[0_0_0_3px_rgba(79,110,247,0.12)]"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onKeyDown={handleKeyDown}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-[0.4px] text-white/50">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3.5 py-3 rounded-[10px] bg-white/6 border border-white/10 text-white/90 text-sm placeholder:text-white/20 outline-none transition-all focus:border-[#4f6ef7]/70 focus:bg-[#4f6ef7]/8 focus:shadow-[0_0_0_3px_rgba(79,110,247,0.12)]"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="login-error-shake flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-[13px]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-1 flex items-center justify-center min-h-11.5 w-full rounded-[10px] text-white text-sm font-semibold border-none cursor-pointer transition-all disabled:opacity-70 disabled:cursor-not-allowed bg-linear-to-br from-[#4f6ef7] to-[#7c3aed] shadow-[0_4px_20px_rgba(79,110,247,0.35)] hover:shadow-[0_8px_28px_rgba(79,110,247,0.5)] hover:-translate-y-px active:translate-y-0"
          >
            {loading ? (
              <span className="login-spinner w-4.5 h-4.5 rounded-full border-2 border-white/30 border-t-white inline-block" />
            ) : (
              "Sign in"
            )}
          </button>
        </div>

        <p className="mt-6 text-center text-[12px] text-white/25 font-mono">
          Demo: <span className="text-white/45">test@test.com</span> /{" "}
          <span className="text-white/45">123456</span>
        </p>
      </div>

      {/* Animations only — not expressible with Tailwind utility classes */}
      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 20px) scale(1.05); }
        }
        .login-orb-1 { animation: orbFloat 8s ease-in-out infinite; }
        .login-orb-2 { animation: orbFloat 10s ease-in-out infinite reverse; }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .login-card { animation: cardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1); }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-5px); }
          40%       { transform: translateX(5px); }
          60%       { transform: translateX(-3px); }
          80%       { transform: translateX(3px); }
        }
        .login-error-shake { animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97); }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .login-spinner { animation: spin 0.7s linear infinite; }
      `}</style>
    </div>
  );
};

export default LoginPage;
