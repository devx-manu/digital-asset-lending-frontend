import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import Loader from "../components/Loader";
import LendingTable from "../components/LendingTable";
import { useAuth } from "../context/AuthContext";
import { assetService } from "../services/assetService";
import { lendingService } from "../services/lendingService";
import { useToast } from "../context/ToastContext";

const BoxIcon = <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const ListIcon = <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
const ClockIcon = <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CheckIcon = <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export default function DashboardPage() {
  const { currentUser, isAdmin, isManager } = useAuth();
  const toast = useToast();
  const [assets, setAssets] = useState([]);
  const [lendings, setLendings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);

 useEffect(() => {

  if (currentUser?.id) {
    fetchData();
  }

}, [currentUser]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [assetsRes, lendingsRes] = await Promise.all([
        assetService.getAll(),
        isAdmin() || isManager()
          ? lendingService.getAll()
          : lendingService.getByUser(currentUser.id),
      ]);
      setAssets(assetsRes.data || []);
      setLendings(lendingsRes.data || []);
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setLoadingId(id);
    try {
      await lendingService.approve(id, currentUser.id);
      toast.success("Request approved successfully");
      fetchData();
    } catch (err) { toast.error(err.userMessage); }
    finally { setLoadingId(null); }
  };

  const handleReject = async (id) => {
    setLoadingId(id);
    try {
      await lendingService.reject(id, currentUser.id);
      toast.success("Request rejected");
      fetchData();
    } catch (err) { toast.error(err.userMessage); }
    finally { setLoadingId(null); }
  };

  const handleReturn = async (id) => {
    setLoadingId(id);
    try {
      await lendingService.return(id);
      toast.success("Asset returned successfully");
      fetchData();
    } catch (err) { toast.error(err.userMessage); }
    finally { setLoadingId(null); }
  };

  const pending = lendings.filter(l => l.status === "PENDING");
  const approved = lendings.filter(l => l.status === "ACTIVE");
  const available = assets.filter(a => a.availableLicenses > 0);

  if (loading) return <Layout pageTitle="DASHBOARD"><Loader /></Layout>;

  return (
    <Layout pageTitle="DASHBOARD">
      {/* Welcome */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="section-label">Welcome back,</span>
        </div>
        <h2 className="font-display text-white text-xl font-bold tracking-wide">
          {currentUser.name}
          <span className="ml-3 font-mono text-sm font-normal text-cyber-muted">// {currentUser.role}</span>
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Assets" value={assets.length} sub="In system" color="blue" icon={BoxIcon} />
        <StatCard label="Available" value={available.length} sub="Ready to lend" color="green" icon={CheckIcon} />
        <StatCard label="Pending" value={pending.length} sub="Awaiting review" color="amber" icon={ClockIcon} />
        <StatCard label="Active Loans" value={approved.length} sub="Currently lent" color="violet" icon={ListIcon} />
      </div>

      {/* Recent lendings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="section-label">Recent Activity</div>
            <div className="page-header text-base mt-0.5">
              {isAdmin() || isManager() ? "All Lending Records" : "My Lendings"}
            </div>
          </div>
        </div>
        <LendingTable
          lendings={lendings.slice(0, 10)}
          onApprove={handleApprove}
          onReject={handleReject}
          onReturn={handleReturn}
          loadingId={loadingId}
        />
      </div>
    </Layout>
  );
}
