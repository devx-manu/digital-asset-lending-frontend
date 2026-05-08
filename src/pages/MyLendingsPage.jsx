import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LendingTable from "../components/LendingTable";
import Loader from "../components/Loader";
import { lendingService } from "../services/lendingService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function MyLendingsPage() {
  const { currentUser } = useAuth();
  const toast = useToast();
  const [lendings, setLendings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);

  const fetchLendings = () => {
    setLoading(true);
    lendingService.getByUser(currentUser.id)
      .then(r => setLendings(r.data || []))
      .catch(() => toast.error("Failed to load lendings"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {

  if (currentUser?.id) {
    fetchLendings();
  }

}, [currentUser]);

  const handleReturn = async (id) => {
    setLoadingId(id);
    try {
      await lendingService.return(id);
      toast.success("Asset returned successfully!");
      fetchLendings();
    } catch (err) {
      toast.error(err.userMessage || "Return failed");
    } finally {
      setLoadingId(null);
    }
  };

  const statusCount = (s) => lendings.filter(l => l.status === s).length;

  return (
    <Layout pageTitle="MY LENDINGS">
      <div className="mb-6">
        <div className="section-label">Personal Records</div>
        <div className="page-header mt-0.5">My Lending History</div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: lendings.length, cls: "text-cyber-blue" },
          { label: "Pending", value: statusCount("PENDING"), cls: "text-amber-400" },
          { label: "Active", value: statusCount("ACTIVE"), cls: "text-emerald-400" },
          { label: "Returned", value: statusCount("RETURNED"), cls: "text-violet-400" },
        ].map(s => (
          <div key={s.label} className="glass-card p-4 text-center">
            <div className={`font-display text-2xl font-bold ${s.cls}`}>{s.value}</div>
            <div className="section-label mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {loading ? <Loader /> : (
        <LendingTable lendings={lendings} onReturn={handleReturn} loadingId={loadingId} />
      )}
    </Layout>
  );
}
