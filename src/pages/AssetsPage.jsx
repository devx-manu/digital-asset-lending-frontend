import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AssetCard from "../components/AssetCard";
import Loader from "../components/Loader";
import { assetService } from "../services/assetService";
import { lendingService } from "../services/lendingService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function AssetsPage() {
  const { currentUser, isUser } = useAuth();
  const toast = useToast();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    assetService.getAll()
      .then(r => setAssets(r.data || []))
      .catch(() => toast.error("Failed to load assets"))
      .finally(() => setLoading(false));
  }, []);

  const handleRequest = async (assetId) => {
    setRequesting(assetId);
    try {
      await lendingService.request(currentUser.id, assetId);
      toast.success("Asset request submitted! Awaiting manager approval.");
    } catch (err) {
      toast.error(err.userMessage || "Request failed");
    } finally {
      setRequesting(null);
    }
  };

  const types = ["ALL", ...new Set(assets.map(a => a.type))];
  const filtered = assets.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.department.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "ALL" || a.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <Layout pageTitle="ASSETS">
      <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <div className="section-label">Asset Catalog</div>
          <div className="page-header mt-0.5">Digital Assets</div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="cyber-input flex-1 sm:w-48"
            placeholder="Search assets..."
          />
        </div>
      </div>

      {/* Type filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {types.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              filter === t
                ? "bg-cyber-blue text-white"
                : "border border-cyber-border text-cyber-muted hover:border-cyber-blue hover:text-cyber-blue"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <div className="glass-card flex flex-col items-center justify-center py-20 text-center">
          <div className="font-mono text-cyber-muted text-sm">NO ASSETS FOUND</div>
          <div className="text-cyber-muted/60 text-xs mt-1">Try adjusting your search or filters</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(asset => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onRequest={isUser() ? handleRequest : null}
              requesting={requesting}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
