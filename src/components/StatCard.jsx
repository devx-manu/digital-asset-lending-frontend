export default function StatCard({ label, value, sub, color = "blue", icon }) {
  const colors = {
    blue: { border: "border-cyber-blue/30", bg: "bg-cyber-blue/10", text: "text-cyber-blue", glow: "rgba(14,165,233,0.1)" },
    green: { border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400", glow: "rgba(16,185,129,0.1)" },
    amber: { border: "border-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-400", glow: "rgba(245,158,11,0.1)" },
    red: { border: "border-red-500/30", bg: "bg-red-500/10", text: "text-red-400", glow: "rgba(239,68,68,0.1)" },
    violet: { border: "border-violet-500/30", bg: "bg-violet-500/10", text: "text-violet-400", glow: "rgba(139,92,246,0.1)" },
  };
  const c = colors[color] || colors.blue;

  return (
    <div className={`glass-card p-5 border ${c.border}`} style={{ boxShadow: `0 0 20px ${c.glow}` }}>
      <div className="flex items-start justify-between">
        <div>
          <div className="section-label mb-2">{label}</div>
          <div className={`font-display text-3xl font-bold ${c.text}`}>{value}</div>
          {sub && <div className="text-cyber-muted text-xs mt-1">{sub}</div>}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center ${c.text}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
