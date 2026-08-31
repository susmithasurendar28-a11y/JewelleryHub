import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import { addToCart } from "../../redux/cartSlice";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "../../styles/productDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // GET PRODUCT
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log("Error loading product:", error);
      });
  }, [id]);

  // LOADING
  if (!product) {
    return (
      <>
        <Navbar />

        <div className="product-loading">
          Product not found
        </div>

        <Footer />
      </>
    );
  }

  // INCREASE QUANTITY
  const increaseQuantity = () => {
    if (quantity < Number(product.stock)) {
      setQuantity(quantity + 1);
    }
  };

  // DECREASE QUANTITY
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // ADD PRODUCT TO REDUX CART
  const addProductToBag = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
      })
    );
  };

  // ADD TO BAG
  const addToBag = () => {
    addProductToBag();

    alert("Product added to bag");
  };

  // BUY NOW
  const buyNow = () => {
    addProductToBag();

    navigate("/checkout");
  };

  return (
    <>
      <Navbar />

      <main className="product-details-page">

        <div className="product-details-container">

          {/* PRODUCT IMAGE */}

          <div className="product-image-section">

            <img
              src={product.image}
              alt={product.productName}
            />

          </div>

          {/* PRODUCT INFORMATION */}

          <div className="product-info-section">

            {/* CATEGORY */}

            <p className="product-category">
              {product.category}
            </p>

            {/* PRODUCT NAME */}

            <h1>
              {product.productName}
            </h1>

            {/* RATING */}

            <div className="product-rating">
              ★ {product.rating || "4.5"}
            </div>

            {/* PRICE */}

            <h2 className="product-price">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </h2>

            {/* DESCRIPTION */}

            <p className="product-description">
              Elegant and stylish jewellery designed
              to add beauty to your everyday and special
              occasions. Carefully selected for quality,
              comfort and timeless style.
            </p>

            {/* STOCK */}

            <div className="stock-info">

              {Number(product.stock) > 0
                ? `${product.stock} items available`
                : "Out of stock"}

            </div>

            {/* QUANTITY */}

            <div className="quantity-section">

              <span>
                Quantity
              </span>

              <div className="quantity-box">

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  −
                </button>

                <span>
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={
                    quantity >= Number(product.stock)
                  }
                >
                  +
                </button>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="product-buttons">

              <button
                type="button"
                className="add-bag-btn"
                onClick={addToBag}
                disabled={Number(product.stock) <= 0}
              >
                Add to Bag
              </button>

              <button
                type="button"
                className="buy-now-btn"
                onClick={buyNow}
                disabled={Number(product.stock) <= 0}
              >
                Buy Now
              </button>

            </div>

            {/* FEATURES */}

            <div className="product-features">

              <div>
                <strong>✓</strong>
                <span>
                  Authentic Jewellery
                </span>
              </div>

              <div>
                <strong>↻</strong>
                <span>
                  Easy Returns
                </span>
              </div>

              <div>
                <strong>◇</strong>
                <span>
                  Secure Packaging
                </span>
              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default ProductDetails;