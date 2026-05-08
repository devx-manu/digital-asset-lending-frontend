import { useAuth } from "../context/AuthContext";

const statusMap = {
  PENDING: "status-pending",
  APPROVED: "status-approved",
  REJECTED: "status-rejected",
  RETURNED: "status-returned",
};

export default function LendingTable({ lendings, onApprove, onReject, onReturn, loadingId }) {
  const { isManager, isUser, currentUser } = useAuth();

  if (!lendings || lendings.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-cyber-navy border border-cyber-border flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-cyber-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div className="font-mono text-cyber-muted text-sm">NO RECORDS FOUND</div>
        <div className="text-cyber-muted/60 text-xs mt-1">No lending records to display</div>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="cyber-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Asset</th>
              <th>User</th>
              <th>Department</th>
              <th>Status</th>
              {(isManager() || isUser()) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {lendings.map((lending) => (
              <tr key={lending.id}>
                <td>
                  <span className="font-mono text-cyber-blue text-xs">#{String(lending.id).padStart(4, "0")}</span>
                </td>
                <td>
                  <span className="text-white font-medium">{lending.assetName || lending.asset?.name || `Asset #${lending.assetId}`}</span>
                </td>
                <td>
                  <span className="text-cyber-text">{lending.userName || lending.user?.name || `User #${lending.userId}`}</span>
                </td>
                <td>
                  <span className="text-cyber-muted text-xs">{lending.department || lending.user?.department || "—"}</span>
                </td>
                <td>
                  <span className={statusMap[lending.status] || "status-badge bg-cyber-dark text-cyber-muted border-cyber-border"}>
                    {lending.status}
                  </span>
                </td>
                {(isManager() || isUser()) && (
                  <td>
                    <div className="flex items-center gap-2">
                      {isManager() && lending.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => onApprove(lending.id)}
                            disabled={loadingId === lending.id}
                            className="cyber-btn-success px-3 py-1.5 text-xs"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => onReject(lending.id)}
                            disabled={loadingId === lending.id}
                            className="cyber-btn-danger px-3 py-1.5 text-xs"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {isUser() && lending.status === "ACTIVE" && (
                        <button
                          onClick={() => onReturn(lending.id)}
                          disabled={loadingId === lending.id}
                          className="cyber-btn-ghost px-3 py-1.5 text-xs"
                        >
                          {loadingId === lending.id ? "..." : "Return"}
                        </button>
                      )}
                      {(!isManager() && !isUser()) || (lending.status !== "PENDING" && lending.status !== "APPROVED") ? (
                        <span className="text-cyber-muted text-xs">—</span>
                      ) : null}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
