import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "../../styles/ordersu.css";

function Ordersu() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://jewelleryhub-api.onrender.com/orders"
      );

      let allOrders = response.data;

      if (loggedInUser) {
        allOrders = allOrders.filter(
          (order) =>
            order.userId === loggedInUser.id
        );
      }

      setOrders(allOrders.reverse());
    } catch (error) {
      console.log("Orders error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status) => {
    if (status === "Order Placed") {
      return 1;
    }

    if (status === "Confirmed") {
      return 2;
    }

    if (status === "Shipped") {
      return 3;
    }

    if (status === "Delivered") {
      return 4;
    }

    return 1;
  };

  const steps = [
    "Order Placed",
    "Confirmed",
    "Shipped",
    "Delivered"
  ];

  return (
    <div className="orders-page-container">

      <Navbar />

      <main className="user-orders-page">

        <section className="user-orders-header">

          <span className="orders-brand">
            JEWELLERYHUB
          </span>

          <h1>My Orders</h1>

          <p>
            Track and manage your jewellery orders
          </p>

          <div className="orders-heading-line"></div>

        </section>

        {loading ? (

          <div className="orders-message">
            Loading your orders...
          </div>

        ) : orders.length === 0 ? (

          <section className="orders-empty">

            <div className="orders-empty-icon">
              ◇
            </div>

            <h2>No Orders Yet</h2>

            <p>
              You haven't placed any orders yet.
              Start exploring our jewellery collection.
            </p>

            <Link
              to="/collections"
              className="orders-shop-button"
            >
              Explore Jewellery
            </Link>

          </section>

        ) : (

          <section className="orders-list">

            {orders.map((order) => {

              const currentStep = getStatusStep(
                order.status
              );

              return (

                <article
                  className="user-order-card"
                  key={order.id}
                >

                  {/* ORDER HEADER */}

                  <div className="user-order-top">

                    <div className="order-info-box">

                      <span>
                        ORDER ID
                      </span>

                      <strong>
                        #{order.id}
                      </strong>

                    </div>

                    <div className="order-info-box">

                      <span>
                        ORDER DATE
                      </span>

                      <strong>
                        {order.date || "N/A"}
                      </strong>

                    </div>

                    <div className="order-info-box">

                      <span>
                        TOTAL
                      </span>

                      <strong>
                        ₹
                        {Number(
                          order.total || 0
                        ).toLocaleString("en-IN")}
                      </strong>

                    </div>

                  </div>


                  {/* TRACKING */}

                  <div className="order-tracking">

                    <h2>
                      Order Tracking
                    </h2>

                    <div className="tracking-container">

                      {steps.map(
                        (step, index) => {

                          const stepNumber =
                            index + 1;

                          const completed =
                            stepNumber <=
                            currentStep;

                          return (

                            <div
                              className={`tracking-step ${
                                completed
                                  ? "completed"
                                  : ""
                              }`}
                              key={step}
                            >

                              <div className="tracking-circle">

                                {completed
                                  ? "✓"
                                  : stepNumber}

                              </div>

                              <span>
                                {step}
                              </span>

                            </div>

                          );
                        }
                      )}

                    </div>

                  </div>


                  {/* PRODUCTS */}

                  <div className="user-order-products">

                    <h2>
                      Ordered Items
                    </h2>

                    {order.products?.map(
                      (item, index) => (

                        <div
                          className="user-order-product"
                          key={
                            item.id || index
                          }
                        >

                          <div className="user-order-image">

                            <img
                              src={item.image}
                              alt={
                                item.productName ||
                                "Jewellery"
                              }
                            />

                          </div>


                          <div className="user-order-product-info">

                            <h3>
                              {item.productName}
                            </h3>

                            <p>
                              {item.category}
                            </p>

                            <span>
                              Quantity:{" "}
                              {item.quantity || 1}
                            </span>

                          </div>


                          <strong className="order-product-price">

                            ₹
                            {(
                              Number(
                                item.price || 0
                              ) *
                              Number(
                                item.quantity || 1
                              )
                            ).toLocaleString(
                              "en-IN"
                            )}

                          </strong>

                        </div>

                      )
                    )}

                  </div>


                  {/* BOTTOM */}

                  <div className="user-order-bottom">

                    <div className="delivery-address">

                      <span>
                        DELIVERY ADDRESS
                      </span>

                      <p>

                        <strong>
                          {order.customer?.name}
                        </strong>

                        <br />

                        {order.customer?.address}

                        <br />

                        {order.customer?.city},{" "}
                        {order.customer?.state}

                        <br />

                        PIN:{" "}
                        {order.customer?.pincode}

                        <br />

                        Phone:{" "}
                        {order.customer?.phone}

                      </p>

                    </div>


                    <div className="order-payment">

                      <span>
                        PAYMENT
                      </span>

                      <strong>
                        {order.paymentMethod ||
                          "Cash on Delivery"}
                      </strong>

                    </div>


                    <div className="order-total">

                      <span>
                        TOTAL AMOUNT
                      </span>

                      <strong>
                        ₹
                        {Number(
                          order.total || 0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>

                  </div>

                </article>
              );
            })}

          </section>
        )}

      </main>

      <Footer />

    </div>
  );
}

export default Ordersu;