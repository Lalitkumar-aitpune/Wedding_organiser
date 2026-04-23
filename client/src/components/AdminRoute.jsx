import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function AdminRoute({ children }) {
  const { adminUser } = useAppContext();

  if (!adminUser || adminUser.role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

export default AdminRoute;
