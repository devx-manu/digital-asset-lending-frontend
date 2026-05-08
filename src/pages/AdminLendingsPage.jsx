import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LendingTable from "../components/LendingTable";
import Loader from "../components/Loader";
import StatCard from "../components/StatCard";
import { lendingService } from "../services/lendingService";
import { useToast } from "../context/ToastContext";

export default function AdminLendingsPage() {
  const toast = useToast();
  const [lendings, setLendings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    lendingService.getAll()
      .then(r => setLendings(r.data || []))
      .catch(() => toast.error("Failed to load lendings"))
      .finally(() => setLoading(false));
  }, []);

  const count = (s) => lendings.filter(l => l.status === s).length;
  const filtered = lendings.filter(l =>
    (l.assetName || "").toLowerCase().includes(search.toLowerCase()) ||
    (l.userName || "").toLowerCase().includes(search.toLowerCase())
  );

  const ListIcon = <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;

  return (
    <Layout pageTitle="ADMIN / LENDINGS">
      <div className="mb-6">
        <div className="section-label">Admin Overview</div>
        <div className="page-header mt-0.5">All Lending Records</div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Records" value={lendings.length} color="blue" icon={ListIcon} />
        <StatCard label="Pending" value={count("PENDING")} color="amber" icon={ListIcon} />
        <StatCard label="Approved" value={count("APPROVED")} color="green" icon={ListIcon} />
        <StatCard label="Returned" value={count("RETURNED")} color="violet" icon={ListIcon} />
      </div>

      <div className="flex items-center justify-between mb-4 gap-4">
        <div>
          <div className="section-label">Records ({filtered.length})</div>
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="cyber-input w-48"
          placeholder="Search..."
        />
      </div>

      {loading ? <Loader /> : <LendingTable lendings={filtered} />}
    </Layout>
  );
}
