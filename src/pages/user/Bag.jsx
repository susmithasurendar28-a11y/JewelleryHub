import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  updateQuantity,
  removeFromCart,
} from "../../redux/cartSlice";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "../../styles/bag.css";

function Bag() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bag = useSelector((state) => state.cart.items);

  const increaseQuantity = (id) => {
    const product = bag.find(
      (item) => String(item.id) === String(id)
    );

    if (!product) return;

    dispatch(
      updateQuantity({
        id: product.id,
        quantity: Number(product.quantity || 1) + 1,
      })
    );
  };

  const decreaseQuantity = (id) => {
    const product = bag.find(
      (item) => String(item.id) === String(id)
    );

    if (!product) return;

    const currentQuantity = Number(product.quantity || 1);

    if (currentQuantity > 1) {
      dispatch(
        updateQuantity({
          id: product.id,
          quantity: currentQuantity - 1,
        })
      );
    }
  };

  const removeProduct = (id) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = bag.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const deliveryCharge =
    subtotal >= 1000 ? 0 : subtotal === 0 ? 0 : 99;

  const totalAmount = subtotal + deliveryCharge;

  const goToCheckout = () => {
    if (bag.length === 0) {
      alert("Your bag is empty.");
      return;
    }

    navigate("/checkout");
  };

  return (
    <>
      <Navbar />

      <main className="bag-page">

        <div className="bag-header">
          <span>JEWELLERYHUB</span>

          <h1>My Bag</h1>

          <p>
            Review your selected jewellery before checkout.
          </p>
        </div>

        {bag.length === 0 ? (

          <div className="bag-empty">

            <div className="bag-icon">
              🛍
            </div>

            <h2>Your bag is empty</h2>

            <p>
              You haven't added any jewellery to your bag yet.
            </p>

            <Link
              to="/"
              className="bag-shop-button"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="bag-content">

            <section className="bag-products">

              <div className="bag-products-heading">
                <h2>Shopping Bag</h2>

                <span>
                  {bag.length} item
                  {bag.length > 1 ? "s" : ""}
                </span>
              </div>

              {bag.map((item) => (

                <div
                  className="bag-item"
                  key={item.id}
                >

                  <Link
                    to={`/product/${item.id}`}
                    className="bag-item-image"
                  >
                    <img
                      src={item.image}
                      alt={item.productName}
                    />
                  </Link>

                  <div className="bag-item-info">

                    <span>
                      {item.category || "JEWELLERY"}
                    </span>

                    <h3>
                      {item.productName}
                    </h3>

                    <strong>
                      ₹
                      {Number(
                        item.price || 0
                      ).toLocaleString("en-IN")}
                    </strong>

                    <div className="bag-quantity">

                      <button
                        type="button"
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity || 1}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <div className="bag-item-right">

                    <strong>
                      ₹
                      {(
                        Number(item.price || 0) *
                        Number(item.quantity || 1)
                      ).toLocaleString("en-IN")}
                    </strong>

                    <button
                      type="button"
                      className="bag-remove"
                      onClick={() =>
                        removeProduct(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </section>

            <aside className="bag-summary">

              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>

                <strong>
                  ₹
                  {subtotal.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="summary-row">
                <span>Delivery</span>

                <strong>
                  {deliveryCharge === 0
                    ? "FREE"
                    : `₹${deliveryCharge}`}
                </strong>
              </div>

              <div className="summary-line"></div>

              <div className="summary-total">
                <span>Total</span>

                <strong>
                  ₹
                  {totalAmount.toLocaleString("en-IN")}
                </strong>
              </div>

              <button
                type="button"
                className="checkout-button"
                onClick={goToCheckout}
              >
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="continue-shopping"
              >
                ← Continue Shopping
              </Link>

            </aside>

          </div>

        )}

      </main>

      <Footer />
    </>
  );
}

export default Bag;