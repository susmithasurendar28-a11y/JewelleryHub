import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/dashboard.css";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Get products
      const productsRes = await axios.get(
        "http://localhost:3000/products"
      );

      setProducts(productsRes.data);

      // Get users
      try {
        const usersRes = await axios.get(
          "http://localhost:3000/users"
        );

        setUsers(usersRes.data);
      } catch {
        setUsers([]);
      }

      // Get orders
      try {
        const ordersRes = await axios.get(
          "http://localhost:3000/orders"
        );

        setOrders(ordersRes.data);
      } catch {
        setOrders([]);
      }

    } catch (error) {
      console.log("Dashboard error:", error);
    }
  };


  // Unique categories
  const categories = [
    ...new Set(
      products
        .map((product) => product.category?.toLowerCase())
        .filter(Boolean)
    ),
  ];


  // Low stock products
  const lowStockProducts = products.filter(
    (product) =>
      Number(
        product.stock ?? product.quantity ?? 0
      ) <= 5
  );


  // Recent products
  const recentProducts = [...products]
    .reverse()
    .slice(0, 5);


  // Order status counts
  const pendingOrders = orders.filter(
    (order) =>
      order.status?.toLowerCase() === "pending"
  ).length;

  const confirmedOrders = orders.filter(
    (order) =>
      order.status?.toLowerCase() === "confirmed"
  ).length;

  const shippedOrders = orders.filter(
    (order) =>
      order.status?.toLowerCase() === "shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) =>
      order.status?.toLowerCase() === "delivered"
  ).length;


  return (
    <div className="admin-layout">

      {/* Sidebar */}

      <AdminSidebar />


      {/* Dashboard */}

      <main className="dashboard-page">

        {/* =========================
            HEADER
        ========================= */}

        <div className="dashboard-header">

          <div>

            <p className="dashboard-label">
              ADMIN PANEL
            </p>

            <h1>
              Dashboard
            </h1>

            <p className="dashboard-subtitle">
              Welcome back! Here's an overview
              of your jewellery store.
            </p>

          </div>

        </div>


        {/* =========================
            STATISTICS
        ========================= */}

        <div className="dashboard-stats">


          {/* USERS */}

          <div className="stat-card">

            <div className="stat-icon">
              👥
            </div>

            <div>

              <p>
                Total Users
              </p>

              <h2>
                {users.length}
              </h2>

              <span>
                Registered customers
              </span>

            </div>

          </div>


          {/* PRODUCTS */}

          <div className="stat-card">

            <div className="stat-icon">
              💎
            </div>

            <div>

              <p>
                Total Products
              </p>

              <h2>
                {products.length}
              </h2>

              <span>
                Jewellery products
              </span>

            </div>

          </div>


          {/* ORDERS */}

          <div className="stat-card">

            <div className="stat-icon">
              🛍️
            </div>

            <div>

              <p>
                Total Orders
              </p>

              <h2>
                {orders.length}
              </h2>

              <span>
                Customer orders
              </span>

            </div>

          </div>


          {/* CATEGORIES */}

          <div className="stat-card">

            <div className="stat-icon">
              📁
            </div>

            <div>

              <p>
                Categories
              </p>

              <h2>
                {categories.length}
              </h2>

              <span>
                Product categories
              </span>

            </div>

          </div>

        </div>


        {/* =========================
            PRODUCTS + ORDERS
        ========================= */}

        <div className="dashboard-grid">


          {/* =====================
              RECENT PRODUCTS
          ===================== */}

          <section className="dashboard-card">

            <div className="card-header">

              <div>

                <h2>
                  Recent Products
                </h2>

                <p>
                  Latest products added to your store
                </p>

              </div>

              <Link to="/admin/products">
                View All
              </Link>

            </div>


            <div className="product-list">

              {recentProducts.length === 0 ? (

                <div className="empty-message">
                  No products available
                </div>

              ) : (

                recentProducts.map((product) => (

                  <div
                    className="product-item"
                    key={product.id}
                  >

                    <img
                      src={product.image}
                      alt={product.productName}
                    />


                    <div className="product-info">

                      <strong>
                        {product.productName}
                      </strong>

                      <span>
                        {product.category || "Jewellery"}
                      </span>

                    </div>


                    <strong className="product-price">

                      ₹
                      {Number(
                        product.price || 0
                      ).toLocaleString("en-IN")}

                    </strong>

                  </div>

                ))

              )}

            </div>

          </section>


          {/* =====================
              ORDER OVERVIEW
          ===================== */}

          <section className="dashboard-card">

            <div className="card-header">

              <div>

                <h2>
                  Order Overview
                </h2>

                <p>
                  Current order status
                </p>

              </div>

              <Link to="/admin/orders">
                View All
              </Link>

            </div>


            <div className="order-list">


              <div className="order-row">

                <span>
                  Pending
                </span>

                <strong>
                  {pendingOrders}
                </strong>

              </div>


              <div className="order-row">

                <span>
                  Confirmed
                </span>

                <strong>
                  {confirmedOrders}
                </strong>

              </div>


              <div className="order-row">

                <span>
                  Shipped
                </span>

                <strong>
                  {shippedOrders}
                </strong>

              </div>


              <div className="order-row">

                <span>
                  Delivered
                </span>

                <strong>
                  {deliveredOrders}
                </strong>

              </div>

            </div>

          </section>

        </div>


        {/* =========================
            LOW STOCK
        ========================= */}

        <section className="dashboard-card low-stock">

          <div className="card-header">

            <div>

              <h2>
                Low Stock Products
              </h2>

              <p>
                Products that need restocking
              </p>

            </div>

            <Link to="/admin/products">
              Manage Products
            </Link>

          </div>


          {lowStockProducts.length === 0 ? (

            <div className="success-message">

              ✓ All products have sufficient stock.

            </div>

          ) : (

            <div className="low-stock-list">

              {lowStockProducts
                .slice(0, 5)
                .map((product) => (

                  <div
                    className="low-stock-item"
                    key={product.id}
                  >

                    <div>

                      <strong>
                        {product.productName}
                      </strong>

                      <span>
                        {product.category || "Jewellery"}
                      </span>

                    </div>


                    <span className="stock-warning">

                      {Number(
                        product.stock ??
                        product.quantity ??
                        0
                      )}{" "}
                      left

                    </span>

                  </div>

                ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Dashboard;