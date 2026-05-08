import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AssetsPage from "./pages/AssetsPage";
import MyLendingsPage from "./pages/MyLendingsPage";
import RequestsPage from "./pages/RequestsPage";
import AdminAssetsPage from "./pages/AdminAssetsPage";
import AdminLendingsPage from "./pages/AdminLendingsPage";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected - All roles */}
            <Route path="/dashboard" element={
              <ProtectedRoute><DashboardPage /></ProtectedRoute>
            } />
            <Route path="/assets" element={
              <ProtectedRoute><AssetsPage /></ProtectedRoute>
            } />

            {/* USER only */}
            <Route path="/my-lendings" element={
              <ProtectedRoute roles={["USER"]}><MyLendingsPage /></ProtectedRoute>
            } />

            {/* MANAGER only */}
            <Route path="/requests" element={
              <ProtectedRoute roles={["MANAGER"]}><RequestsPage /></ProtectedRoute>
            } />

            {/* ADMIN only */}
            <Route path="/admin/assets" element={
              <ProtectedRoute roles={["ADMIN"]}><AdminAssetsPage /></ProtectedRoute>
            } />
            <Route path="/admin/lendings" element={
              <ProtectedRoute roles={["ADMIN"]}><AdminLendingsPage /></ProtectedRoute>
            } />

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
