import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const icons = {
  dashboard: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  assets: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  lendings: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  requests: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  create: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
    </svg>
  ),
  logout: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
};

const roleColors = {
  ADMIN: "text-red-400 bg-red-900/30 border-red-800/50",
  MANAGER: "text-amber-400 bg-amber-900/30 border-amber-800/50",
  USER: "text-emerald-400 bg-emerald-900/30 border-emerald-800/50",
};

export default function Sidebar({ open, setOpen }) {
  const { currentUser, logout, isAdmin, isManager } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: "dashboard", roles: ["ADMIN", "MANAGER", "USER"] },
    { to: "/assets", label: "Assets", icon: "assets", roles: ["ADMIN", "MANAGER", "USER"] },
    { to: "/my-lendings", label: "My Lendings", icon: "lendings", roles: ["USER"] },
    { to: "/requests", label: "Requests", icon: "requests", roles: ["MANAGER"] },
    { to: "/admin/assets", label: "Create Asset", icon: "create", roles: ["ADMIN"] },
    { to: "/admin/lendings", label: "All Lendings", icon: "lendings", roles: ["ADMIN"] },
  ];

  const visibleItems = navItems.filter(item => item.roles.includes(currentUser?.role));

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-cyber-dark border-r border-cyber-border z-30
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-cyber-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyber-blue/20 border border-cyber-blue/40 flex items-center justify-center">
              <svg className="w-4 h-4 text-cyber-blue" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="font-display text-white text-xs font-bold tracking-widest">DAL SYSTEM</div>
              <div className="font-mono text-cyber-muted text-xs">v2.0.1</div>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="px-4 py-4 border-b border-cyber-border/50">
          <div className="glass-card p-3 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-accent flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0">
                {currentUser?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div className="min-w-0">
                <div className="text-white text-sm font-medium truncate">{currentUser?.name}</div>
                <div className="text-cyber-muted text-xs truncate">{currentUser?.department}</div>
              </div>
            </div>
            <div className="mt-2">
              <span className={`px-2 py-0.5 rounded text-xs font-mono font-medium border ${roleColors[currentUser?.role] || ""}`}>
                {currentUser?.role}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 flex flex-col gap-1">
          <div className="section-label px-1 mb-2">Navigation</div>
          {visibleItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {icons[item.icon]}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-4 border-t border-cyber-border">
          <button onClick={handleLogout} className="nav-link w-full hover:text-red-400 hover:bg-red-900/20">
            {icons.logout}
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
