export default function AssetCard({ asset, onRequest, requesting }) {
  const availability = asset.totalLicenses > 0
    ? Math.round((asset.availableLicenses / asset.totalLicenses) * 100)
    : 0;

  const typeColors = {
    LICENSE: "text-cyber-blue bg-cyber-blue/10 border-cyber-blue/30",
    HARDWARE: "text-violet-400 bg-violet-900/20 border-violet-800/30",
    SOFTWARE: "text-emerald-400 bg-emerald-900/20 border-emerald-800/30",
    SUBSCRIPTION: "text-amber-400 bg-amber-900/20 border-amber-800/30",
  };

  return (
    <div className="glass-card p-5 hover:border-cyber-blue/40 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-base truncate group-hover:text-cyber-bright transition-colors">
            {asset.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-2 py-0.5 rounded text-xs font-mono border ${typeColors[asset.type] || typeColors.LICENSE}`}>
              {asset.type}
            </span>
            <span className="text-cyber-muted text-xs">{asset.department}</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center flex-shrink-0 ml-3">
          <svg className="w-5 h-5 text-cyber-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
      </div>

      {/* Availability bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-cyber-muted text-xs font-mono">AVAILABILITY</span>
          <span className="text-cyber-text text-xs font-mono">
            {asset.availableLicenses}/{asset.totalLicenses}
          </span>
        </div>
        <div className="h-1.5 bg-cyber-dark rounded-full overflow-hidden border border-cyber-border/50">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              availability > 50 ? "bg-emerald-400" : availability > 20 ? "bg-amber-400" : "bg-red-400"
            }`}
            style={{ width: `${availability}%` }}
          />
        </div>
      </div>

      {onRequest && (
        <button
          onClick={() => onRequest(asset.id)}
          disabled={asset.availableLicenses === 0 || requesting === asset.id}
          className={`w-full cyber-btn text-center ${
            asset.availableLicenses === 0
              ? "bg-cyber-dark border border-cyber-border text-cyber-muted cursor-not-allowed"
              : "cyber-btn-primary"
          }`}
        >
          {requesting === asset.id ? "Requesting..." : asset.availableLicenses === 0 ? "Unavailable" : "Request Access"}
        </button>
      )}
    </div>
  );
}
