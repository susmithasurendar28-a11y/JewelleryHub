import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/orders.css";
import AdminSidebar from "../../components/AdminSidebar";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://jewelleryhub-api.onrender.com/orders"
      );

      setOrders(response.data);
    } catch (error) {
      console.log("Orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `https://jewelleryhub-api.onrender.com/orders/${orderId}`,
        {
          status: newStatus
        }
      );

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          String(order.id) === String(orderId)
            ? {
                ...order,
                status: newStatus
              }
            : order
        )
      );
    } catch (error) {
      console.log("Status update error:", error);
      alert("Failed to update order status");
    }
  };

  const placedOrders = orders.filter(
    (order) => order.status === "Order Placed"
  ).length;

  const confirmedOrders = orders.filter(
    (order) => order.status === "Confirmed"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="orders-page">

        <div className="orders-header">

          <div>
            <h1>Orders</h1>

            <p>
              Manage and track customer orders
            </p>
          </div>

          <div className="orders-count">
            {orders.length} Orders
          </div>

        </div>

        <div className="order-summary">

          <div className="summary-card">
            <div className="summary-icon">
              🛍️
            </div>

            <div>
              <span>Total Orders</span>
              <strong>{orders.length}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              ⏳
            </div>

            <div>
              <span>Order Placed</span>
              <strong>{placedOrders}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              📦
            </div>

            <div>
              <span>Confirmed</span>
              <strong>{confirmedOrders}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              🚚
            </div>

            <div>
              <span>Shipped</span>
              <strong>{shippedOrders}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              ✓
            </div>

            <div>
              <span>Delivered</span>
              <strong>{deliveredOrders}</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              ✕
            </div>

            <div>
              <span>Cancelled</span>
              <strong>{cancelledOrders}</strong>
            </div>
          </div>

        </div>

        <section className="orders-table-card">

          <div className="table-title">

            <div>
              <h2>Customer Orders</h2>

              <p>
                Orders placed by customers
              </p>
            </div>

            <span>
              {orders.length} Orders
            </span>

          </div>

          {loading ? (

            <div className="orders-message">
              Loading orders...
            </div>

          ) : orders.length === 0 ? (

            <div className="orders-message">

              <div className="empty-order-icon">
                🛍️
              </div>

              <h3>No Orders Yet</h3>

              <p>
                Customer orders will appear here
                after they place an order.
              </p>

            </div>

          ) : (

            <div className="orders-table-wrapper">

              <table className="orders-table">

                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {orders.map((order) => (

                    <tr key={order.id}>

                      <td>
                        <strong className="order-id">
                          #{order.id}
                        </strong>
                      </td>

                      <td>

                        <div className="customer-name">
                          {order.customer?.name ||
                            order.name ||
                            "Customer"}
                        </div>

                        <small>
                          {order.userEmail || ""}
                        </small>

                      </td>

                      <td>

                        <div className="order-product">

                          {order.products &&
                          order.products.length > 0
                            ? order.products
                                .map(
                                  (product) =>
                                    product.productName
                                )
                                .join(", ")
                            : "Jewellery Product"}

                        </div>

                      </td>

                      <td>

                        <strong className="order-amount">
                          ₹
                          {Number(
                            order.total || 0
                          ).toLocaleString("en-IN")}
                        </strong>

                      </td>

                      <td>

                        <span className="order-date">
                          {order.date || "N/A"}
                        </span>

                      </td>

                      <td>

                        <span
                          className={
                            order.paymentMethod ===
                            "Cash on Delivery"
                              ? "payment pending"
                              : "payment paid"
                          }
                        >
                          {order.paymentMethod ||
                            "Pending"}
                        </span>

                      </td>

                      <td>

                        <select
                          value={
                            order.status ||
                            "Order Placed"
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              order.id,
                              e.target.value
                            )
                          }
                          className={`status-select ${
                            (
                              order.status ||
                              "Order Placed"
                            )
                              .toLowerCase()
                              .replaceAll(" ", "-")
                          }`}
                        >

                          <option value="Order Placed">
                            Order Placed
                          </option>

                          <option value="Confirmed">
                            Confirmed
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Orders;