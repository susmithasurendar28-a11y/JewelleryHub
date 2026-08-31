import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {

  const isAdminLoggedIn =
    localStorage.getItem("adminLoggedIn");

  console.log("Admin Login Status:", isAdminLoggedIn);

  if (isAdminLoggedIn !== "true") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default AdminProtectedRoute;