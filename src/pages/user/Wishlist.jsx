import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

import { addToCart } from "../../redux/cartSlice";

import Navbar from "../../components/Navbar";

import "../../styles/wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");

    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (product) => String(product.id) !== String(id)
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  const addToBag = (product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );

    alert("Product added to bag");
  };

  return (
    <div className="wishlist-page">

      <Navbar />

      <section className="wishlist-heading">

        <p>JEWELLERYHUB</p>

        <h1>My Wishlist</h1>

        <span>
          {wishlist.length}{" "}
          {wishlist.length === 1 ? "item" : "items"} saved
        </span>

      </section>

      {wishlist.length === 0 ? (

        <section className="empty-wishlist">

          <div className="empty-icon">
            <Heart size={42} />
          </div>

          <h2>Your Wishlist is Empty</h2>

          <p>
            Save your favourite jewellery here
            and find them easily later.
          </p>

          <Link
            to="/collections"
            className="continue-shopping"
          >
            Explore Jewellery
          </Link>

        </section>

      ) : (

        <section className="wishlist-products">

          <div className="wishlist-grid">

            {wishlist.map((product) => (

              <div
                className="wishlist-card"
                key={product.id}
              >

                <div className="wishlist-image">

                  <img
                    src={product.image}
                    alt={product.productName}
                  />

                  <button
                    type="button"
                    className="remove-wishlist"
                    onClick={() =>
                      removeFromWishlist(product.id)
                    }
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

                <div className="wishlist-info">

                  <h3>
                    {product.productName}
                  </h3>

                  <p className="wishlist-price">
                    ₹
                    {Number(product.price).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <p className="wishlist-rating">
                    ★ {product.rating}
                  </p>

                  <button
                    type="button"
                    className="view-product"
                    onClick={() => addToBag(product)}
                  >
                    <ShoppingBag size={16} />
                    Add to Bag
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

      )}

    </div>
  );
}

export default Wishlist;