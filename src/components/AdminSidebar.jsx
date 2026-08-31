import { NavLink, useNavigate } from "react-router-dom";
import "../styles/admin.css";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove admin login status
    localStorage.removeItem("adminLoggedIn");

    // Go to admin login page
    navigate("/admin/login");
  };

  return (
    <aside className="admin-sidebar">

      {/* LOGO */}
      <div className="admin-logo">

        <div className="logo-symbol">
          ✦
        </div>

        <div>
          <h2>JewelleryHub</h2>
          <span>ADMIN PANEL</span>
        </div>

      </div>


      {/* MENU */}
      <nav className="admin-menu">

        {/* DASHBOARD */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive
              ? "admin-link active"
              : "admin-link"
          }
        >
          <span>⌂</span>
          <p>Dashboard</p>
        </NavLink>


        {/* PRODUCTS */}
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "admin-link active"
              : "admin-link"
          }
        >
          <span>◇</span>
          <p>Products</p>
        </NavLink>


        {/* CATEGORIES */}
        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            isActive
              ? "admin-link active"
              : "admin-link"
          }
        >
          <span>▦</span>
          <p>Categories</p>
        </NavLink>


        {/* ORDERS */}
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "admin-link active"
              : "admin-link"
          }
        >
          <span>🛍</span>
          <p>Orders</p>
        </NavLink>


        {/* CUSTOMERS */}
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "admin-link active"
              : "admin-link"
          }
        >
          <span>♙</span>
          <p>Customers</p>
        </NavLink>

      </nav>


      {/* BOTTOM MENU */}
      <div className="admin-bottom">

        {/* SETTINGS */}
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            isActive
              ? "admin-link active"
              : "admin-link"
          }
        >
          <span>⚙</span>
          <p>Settings</p>
        </NavLink>


        {/* LOGOUT */}
        <button
          type="button"
          className="admin-logout"
          onClick={handleLogout}
        >
          <span>↪</span>
          <p>Logout</p>
        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;