import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { clearCart } from "../../redux/cartSlice";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // GET CART FROM REDUX
  const bag = useSelector((state) => state.cart.items);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  // GET LOGGED IN USER
  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  // CALCULATE SUBTOTAL
  const subtotal = bag.reduce((total, item) => {
    return (
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1)
    );
  }, 0);

  // DELIVERY CHARGE
  const delivery =
    subtotal === 0
      ? 0
      : subtotal >= 1000
      ? 0
      : 99;

  // TOTAL
  const total = subtotal + delivery;

  // FORM CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // PLACE ORDER
  const placeOrder = async (e) => {
    e.preventDefault();

    // CHECK LOGIN
    if (!loggedInUser) {
      alert(
        "Please login or register before placing an order."
      );

      navigate("/login");

      return;
    }

    // CHECK BAG
    if (bag.length === 0) {
      alert("Your bag is empty.");
      return;
    }

    // PHONE VALIDATION
    if (!/^\d{10}$/.test(formData.phone)) {
      alert(
        "Please enter a valid 10 digit phone number."
      );

      return;
    }

    // PINCODE VALIDATION
    if (!/^\d{6}$/.test(formData.pincode)) {
      alert(
        "Please enter a valid 6 digit pincode."
      );

      return;
    }

    try {

      // CREATE ORDER
      const newOrder = {
        userId: loggedInUser.id,

        userEmail: loggedInUser.email,

        customer: {
          name: formData.name.trim(),
          phone: formData.phone,
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode
        },

        products: bag,

        subtotal: subtotal,

        delivery: delivery,

        total: total,

        status: "Order Placed",

        paymentMethod: "Cash on Delivery",

        date: new Date().toLocaleDateString("en-IN"),

        createdAt: new Date().toISOString()
      };

      // SAVE ORDER TO JSON SERVER
      await axios.post(
        "https://jewelleryhub-api.onrender.com/orders",
        newOrder
      );

      // CLEAR REDUX CART
      dispatch(clearCart());

      alert("Order placed successfully!");

      navigate("/ordersu");

    } catch (error) {

      console.log("Order Error:", error);

      alert(
        "Order failed. Please make sure JSON Server is running."
      );
    }
  };

  // EMPTY BAG
  if (bag.length === 0) {
    return (
      <>
        <Navbar />

        <main className="checkout-page">

          <div className="checkout-empty">

            <h1>
              Your Bag is Empty
            </h1>

            <p>
              Please add some jewellery to your bag.
            </p>

            <button
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>

          </div>

        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="checkout-page">

        <div className="checkout-header">

          <span>
            JEWELLERYHUB
          </span>

          <h1>
            Checkout
          </h1>

          <p>
            Complete your details to place your order.
          </p>

        </div>

        <div className="checkout-container">

          {/* DELIVERY FORM */}

          <section className="checkout-form-section">

            <h2>
              Delivery Information
            </h2>

            <form onSubmit={placeOrder}>

              {/* NAME */}

              <div className="checkout-field">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />

              </div>


              {/* PHONE */}

              <div className="checkout-field">

                <label>
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10 digit phone number"
                  maxLength="10"
                  required
                />

              </div>


              {/* ADDRESS */}

              <div className="checkout-field">

                <label>
                  Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  required
                />

              </div>


              {/* CITY + STATE */}

              <div className="checkout-row">

                <div className="checkout-field">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />

                </div>

                <div className="checkout-field">

                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />

                </div>

              </div>


              {/* PINCODE */}

              <div className="checkout-field">

                <label>
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6 digit pincode"
                  maxLength="6"
                  required
                />

              </div>


              {/* PAYMENT */}

              <h2>
                Payment Method
              </h2>

              <div className="payment-option">

                <strong>
                  ✓ Cash on Delivery
                </strong>

                <p>
                  Pay when your jewellery is delivered.
                </p>

              </div>


              {/* PLACE ORDER */}

              <button
                type="submit"
                className="place-order-button"
              >
                Place Order
              </button>

            </form>

          </section>


          {/* ORDER SUMMARY */}

          <aside className="checkout-summary">

            <h2>
              Order Summary
            </h2>

            {bag.map((item) => (

              <div
                className="checkout-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.productName}
                />

                <div>

                  <h3>
                    {item.productName}
                  </h3>

                  <p>
                    Quantity: {item.quantity || 1}
                  </p>

                </div>

                <strong>
                  ₹
                  {(
                    Number(item.price || 0) *
                    Number(item.quantity || 1)
                  ).toLocaleString("en-IN")}
                </strong>

              </div>

            ))}


            <hr />


            {/* SUBTOTAL */}

            <div className="checkout-summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹
                {subtotal.toLocaleString("en-IN")}
              </strong>

            </div>


            {/* DELIVERY */}

            <div className="checkout-summary-row">

              <span>
                Delivery
              </span>

              <strong>
                {delivery === 0
                  ? "FREE"
                  : `₹${delivery}`}
              </strong>

            </div>


            <hr />


            {/* TOTAL */}

            <div className="checkout-total">

              <span>
                Total
              </span>

              <strong>
                ₹
                {total.toLocaleString("en-IN")}
              </strong>

            </div>

          </aside>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Checkout;