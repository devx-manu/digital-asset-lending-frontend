import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LendingTable from "../components/LendingTable";
import Loader from "../components/Loader";
import { lendingService } from "../services/lendingService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function RequestsPage() {
  const { currentUser } = useAuth();
  const toast = useToast();
  const [lendings, setLendings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [tab, setTab] = useState("PENDING");

  const fetchLendings = () => {
    setLoading(true);
    lendingService.getAll()
      .then(r => setLendings(r.data || []))
      .catch(() => toast.error("Failed to load requests"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchLendings(); }, []);

  const handleApprove = async (id) => {
    setLoadingId(id);
    try {
      await lendingService.approve(id, currentUser.id);
      toast.success("Request approved!");
      fetchLendings();
    } catch (err) { toast.error(err.userMessage); }
    finally { setLoadingId(null); }
  };

  const handleReject = async (id) => {
    setLoadingId(id);
    try {
      await lendingService.reject(id, currentUser.id);
      toast.success("Request rejected");
      fetchLendings();
    } catch (err) { toast.error(err.userMessage); }
    finally { setLoadingId(null); }
  };

  const tabs = ["PENDING", "APPROVED", "REJECTED", "ALL"];
  const filtered = tab === "ALL" ? lendings : lendings.filter(l => l.status === tab);
  const count = (s) => lendings.filter(l => l.status === s).length;

  return (
    <Layout pageTitle="REQUESTS">
      <div className="mb-6">
        <div className="section-label">Manager Console</div>
        <div className="page-header mt-0.5">Lending Requests</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="glass-card p-4 text-center border-amber-800/20">
          <div className="font-display text-2xl font-bold text-amber-400">{count("PENDING")}</div>
          <div className="section-label mt-1">Pending</div>
        </div>
        <div className="glass-card p-4 text-center border-emerald-800/20">
          <div className="font-display text-2xl font-bold text-emerald-400">{count("APPROVED")}</div>
          <div className="section-label mt-1">Approved</div>
        </div>
        <div className="glass-card p-4 text-center border-red-800/20">
          <div className="font-display text-2xl font-bold text-red-400">{count("REJECTED")}</div>
          <div className="section-label mt-1">Rejected</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 border-b border-cyber-border">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-xs font-mono transition-all border-b-2 -mb-px ${
              tab === t
                ? "border-cyber-blue text-cyber-blue"
                : "border-transparent text-cyber-muted hover:text-cyber-text"
            }`}
          >
            {t} {t !== "ALL" && <span className="ml-1 opacity-60">({count(t)})</span>}
          </button>
        ))}
      </div>

      {loading ? <Loader /> : (
        <LendingTable
          lendings={filtered}
          onApprove={handleApprove}
          onReject={handleReject}
          loadingId={loadingId}
        />
      )}
    </Layout>
  );
}
