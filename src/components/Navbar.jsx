import { useAuth } from "../context/AuthContext";

export default function Navbar({ onMenuClick, pageTitle }) {
  const { currentUser } = useAuth();

  return (
    <header className="h-16 bg-cyber-dark border-b border-cyber-border flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-10">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-cyber-muted hover:text-white hover:bg-cyber-navy transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Page title */}
      <div className="flex items-center gap-2">
        <span className="text-cyber-muted font-mono text-xs hidden sm:block">SYS://</span>
        <h1 className="font-display text-white text-sm font-semibold tracking-wider">{pageTitle || "DASHBOARD"}</h1>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {/* Status indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/20 border border-emerald-800/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-emerald-400 text-xs">ONLINE</span>
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-accent flex items-center justify-center text-white font-display font-bold text-xs">
            {currentUser?.name?.charAt(0)?.toUpperCase() || "?"}
          </div>
          <span className="hidden md:block text-cyber-text text-sm font-medium">{currentUser?.name}</span>
        </div>
      </div>
    </header>
  );
}
