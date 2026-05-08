export default function Loader({ fullScreen = false, size = "md" }) {
  const sizes = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizes[size]} relative`}>
        <div className={`${sizes[size]} rounded-full border-2 border-cyber-border border-t-cyber-blue animate-spin`} />
        <div className={`absolute inset-1 rounded-full border border-cyber-blue/20 border-t-cyber-glow animate-spin`} style={{ animationDuration: "0.6s", animationDirection: "reverse" }} />
      </div>
      {fullScreen && <span className="font-mono text-xs text-cyber-muted tracking-widest animate-pulse">INITIALIZING...</span>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-cyber-black grid-bg flex items-center justify-center z-50">
        <div className="text-center">
          <div className="font-display text-cyber-blue text-2xl font-bold mb-8 tracking-widest">DAL SYSTEM</div>
          {spinner}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {spinner}
    </div>
  );
}
