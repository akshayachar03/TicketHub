import { Navigate } from "react-router-dom";
import adminService from "../services/admin.service";

function AdminProtectedRoute({ children }) {
  if (!adminService.isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default AdminProtectedRoute;