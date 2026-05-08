import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AssetCard from "../components/AssetCard";
import Loader from "../components/Loader";
import { assetService } from "../services/assetService";
import { useToast } from "../context/ToastContext";

const TYPES = ["LICENSE", "HARDWARE", "SOFTWARE", "SUBSCRIPTION"];
const DEPTS = ["IT", "HR", "Finance", "Engineering", "Marketing", "Operations"];

const defaultForm = { name: "", type: "LICENSE", totalLicenses: 1, availableLicenses: 1, department: "IT" };

export default function AdminAssetsPage() {
  const toast = useToast();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [showForm, setShowForm] = useState(true);

  const fetchAssets = () => {
    setLoading(true);
    assetService.getAll()
      .then(r => setAssets(r.data || []))
      .catch(() => toast.error("Failed to load assets"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchAssets(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: name.includes("Licenses") ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) { toast.error("Asset name is required"); return; }
    if (form.availableLicenses > form.totalLicenses) { toast.error("Available cannot exceed total"); return; }
    setSubmitting(true);
    try {
      await assetService.create(form);
      toast.success(`Asset "${form.name}" created!`);
      setForm(defaultForm);
      fetchAssets();
    } catch (err) {
      toast.error(err.userMessage || "Failed to create asset");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout pageTitle="ADMIN / ASSETS">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Form */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-cyber-blue/15 border border-cyber-blue/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-cyber-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <div className="section-label">Admin Action</div>
                <div className="font-display text-white text-sm font-bold tracking-wider">Create Asset</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="section-label block mb-2">Asset Name *</label>
                <input name="name" value={form.name} onChange={handleChange} className="cyber-input" placeholder="e.g. Photoshop License" />
              </div>
              <div>
                <label className="section-label block mb-2">Type</label>
                <select name="type" value={form.type} onChange={handleChange} className="cyber-input">
                  {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="section-label block mb-2">Department</label>
                <select name="department" value={form.department} onChange={handleChange} className="cyber-input">
                  {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="section-label block mb-2">Total Licenses</label>
                  <input type="number" min="1" name="totalLicenses" value={form.totalLicenses} onChange={handleChange} className="cyber-input" />
                </div>
                <div>
                  <label className="section-label block mb-2">Available</label>
                  <input type="number" min="0" name="availableLicenses" value={form.availableLicenses} onChange={handleChange} className="cyber-input" />
                </div>
              </div>
              <button type="submit" disabled={submitting} className="w-full cyber-btn-primary py-3 font-display tracking-wider">
                {submitting ? "Creating..." : "CREATE ASSET"}
              </button>
            </form>
          </div>
        </div>

        {/* Asset List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="section-label">Inventory</div>
              <div className="page-header text-base mt-0.5">All Assets ({assets.length})</div>
            </div>
            <button onClick={fetchAssets} className="cyber-btn-ghost text-xs px-3 py-2">
              Refresh
            </button>
          </div>

          {loading ? <Loader /> : assets.length === 0 ? (
            <div className="glass-card flex items-center justify-center py-20">
              <div className="text-center">
                <div className="font-mono text-cyber-muted text-sm">NO ASSETS YET</div>
                <div className="text-cyber-muted/60 text-xs mt-1">Create your first asset using the form</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {assets.map(a => <AssetCard key={a.id} asset={a} />)}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
