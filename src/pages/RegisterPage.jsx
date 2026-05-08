import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useToast } from "../context/ToastContext";

const ROLES = ["USER", "MANAGER", "ADMIN"];
const DEPARTMENTS = ["IT", "HR", "Finance", "Engineering", "Marketing", "Operations"];

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "USER", department: "IT" });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error("Please fill all required fields"); return; }
    setLoading(true);
    try {
      await authService.register(form);
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.userMessage || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black grid-bg flex items-center justify-center p-4">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyber-blue/15 border border-cyber-blue/30 mb-4" style={{ boxShadow: "0 0 30px rgba(14,165,233,0.2)" }}>
            <svg className="w-7 h-7 text-cyber-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="font-display text-white text-2xl font-bold tracking-widest">DAL SYSTEM</h1>
          <p className="text-cyber-muted text-sm mt-1 font-mono">Create New Account</p>
        </div>

        <div className="glass-card p-8">
          <div className="mb-6">
            <h2 className="font-display text-white text-lg font-bold tracking-wider">NEW REGISTRATION</h2>
            <p className="text-cyber-muted text-sm mt-1">Fill in your details to register</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="section-label block mb-2">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="cyber-input" placeholder="John Doe" />
            </div>
            <div>
              <label className="section-label block mb-2">Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="cyber-input" placeholder="john@company.com" />
            </div>
            <div>
              <label className="section-label block mb-2">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="cyber-input" placeholder="••••••••" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="section-label block mb-2">Role</label>
                <select name="role" value={form.role} onChange={handleChange} className="cyber-input">
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="section-label block mb-2">Department</label>
                <select name="department" value={form.department} onChange={handleChange} className="cyber-input">
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full cyber-btn-primary py-3 text-base mt-2 font-display tracking-wider">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  CREATING ACCOUNT...
                </span>
              ) : "CREATE ACCOUNT"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-cyber-border text-center">
            <p className="text-cyber-muted text-sm">
              Have an account?{" "}
              <Link to="/login" className="text-cyber-blue hover:text-cyber-bright transition-colors font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
