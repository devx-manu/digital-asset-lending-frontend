import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    toast.error("Please fill in all fields");
    return;
  }

  setLoading(true);

  try {
    const res = await authService.login(form.email, form.password);

    const response = res.data;

    login(
      {
        id: response.id,
        name: response.name,
        email: response.email,
        role: response.role,
        department: response.department,
      },
      response.token
    );

    toast.success(`Welcome back, ${response.name}!`);

    navigate("/dashboard");

  } catch (err) {
    console.error(err);

    toast.error(
      err.response?.data?.message ||
      err.userMessage ||
      "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-cyber-black grid-bg flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-cyber-glow/3 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyber-blue/15 border border-cyber-blue/30 mb-4" style={{ boxShadow: "0 0 30px rgba(14,165,233,0.2)" }}>
            <svg className="w-7 h-7 text-cyber-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="font-display text-white text-2xl font-bold tracking-widest">DAL SYSTEM</h1>
          <p className="text-cyber-muted text-sm mt-1 font-mono">Digital Asset Lending Platform</p>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <div className="mb-6">
            <h2 className="font-display text-white text-lg font-bold tracking-wider">ACCESS PORTAL</h2>
            <p className="text-cyber-muted text-sm mt-1">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="section-label block mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="cyber-input"
                placeholder="user@company.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="section-label block mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="cyber-input"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full cyber-btn-primary py-3 text-base mt-2 font-display tracking-wider"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  AUTHENTICATING...
                </span>
              ) : "AUTHENTICATE"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-cyber-border text-center">
            <p className="text-cyber-muted text-sm">
              No account?{" "}
              <Link to="/register" className="text-cyber-blue hover:text-cyber-bright transition-colors font-medium">
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Demo hint */}
        <div className="mt-4 glass-card p-3 border-amber-800/30">
          <div className="section-label text-amber-500 mb-2">Demo Credentials</div>
          <div className="font-mono text-xs text-cyber-muted space-y-0.5">
            <div>admin@test.com / 1234 → <span className="text-red-400">ADMIN</span></div>
            <div>manager@test.com / 1234 → <span className="text-amber-400">MANAGER</span></div>
            <div>user@test.com / 1234 → <span className="text-emerald-400">USER</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
