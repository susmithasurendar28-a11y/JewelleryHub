import { BrowserRouter, Routes, Route } from "react-router-dom";

/* =========================
   ADMIN PAGES
========================= */

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import Categories from "./pages/admin/Categories";
import Orders from "./pages/admin/Orders";
import Settings from "./pages/admin/Settings";

/* =========================
   USER PAGES
========================= */

import Home from "./pages/user/Home";
import CategoryProducts from "./pages/user/CategoryProducts";
import ProductDetails from "./pages/user/ProductDetails";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Wishlist from "./pages/user/Wishlist";
import Bag from "./pages/user/Bag";
import Checkout from "./pages/user/Checkout";
import Ordersu from "./pages/user/Ordersu";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";
/* =========================
   ADMIN PROTECTED ROUTE
========================= */

import AdminProtectedRoute from "./components/AdminProtectedRoute";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================
            USER SIDE
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/collections"
          element={<CategoryProducts />}
        />

        <Route
          path="/new-arrivals"
          element={<CategoryProducts />}
        />

        <Route
          path="/category/:category"
          element={<CategoryProducts />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/bag"
          element={<Bag />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/ordersu"
          element={<Ordersu />}
        />
         <Route
  path="/about"
  element={<About />}
/>

<Route
  path="/contact"
  element={<Contact />}
/>

        {/* =========================
            ADMIN LOGIN
        ========================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* =========================
            PROTECTED ADMIN ROUTES
        ========================= */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <Users />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute>
              <Products />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/products/add"
          element={
            <AdminProtectedRoute>
              <AddProduct />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/products/edit/:id"
          element={
            <AdminProtectedRoute>
              <EditProduct />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <AdminProtectedRoute>
              <Categories />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminProtectedRoute>
              <Orders />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <AdminProtectedRoute>
              <Settings />
            </AdminProtectedRoute>
          }
        />


        {/* =========================
            DEFAULT ROUTE
        ========================= */}

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>

    </BrowserRouter>

  );
}


export default App;