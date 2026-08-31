import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Search,
  Heart,
  ShoppingCart,
  UserRound,
  ChevronDown,
  Package,
  User,
  Info,
  Mail,
  LogOut,
} from "lucide-react";

import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [accountOpen, setAccountOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  /* =========================
     GET CART FROM REDUX
  ========================= */

  const bag = useSelector((state) => state.cart.items);

  /* =========================
     CART ITEM COUNT
  ========================= */

  const cartCount = bag.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  /* =========================
     SEARCH
  ========================= */

  const handleSearch = () => {
    const value = searchText.trim();

    if (value !== "") {
      navigate(
        `/category/all?search=${encodeURIComponent(value)}`
      );
    }
  };

  /* =========================
     NEW ARRIVALS
  ========================= */

  const handleNewArrivals = () => {
    if (window.location.pathname === "/") {
      const section = document.getElementById("new-arrivals");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate("/");

      setTimeout(() => {
        const section = document.getElementById("new-arrivals");

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 500);
    }
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");

    setAccountOpen(false);

    navigate("/login");
  };

  return (
    <nav className="user-navbar">

      {/* =========================
          LOGO
      ========================= */}

      <Link
        to="/"
        className="navbar-logo"
      >
        Jewellery<span>Hub</span>
      </Link>


      {/* =========================
          NAVIGATION
      ========================= */}

      <div className="navbar-links">

        <Link
          to="/"
          className="navbar-link"
        >
          Home
        </Link>


        <Link
          to="/collections"
          className="navbar-link"
        >
          Collections
        </Link>


        <button
          type="button"
          className="navbar-link navbar-text-button"
          onClick={handleNewArrivals}
        >
          New Arrivals
        </button>


        {/* =========================
            CATEGORIES
        ========================= */}

        <div className="navbar-category">

          <button
            type="button"
            className="category-trigger"
            onClick={() =>
              setCategoryOpen(!categoryOpen)
            }
          >
            Categories

            <ChevronDown size={15} />

          </button>


          {categoryOpen && (

            <div className="category-dropdown">

              <Link
                to="/category/rings"
                onClick={() =>
                  setCategoryOpen(false)
                }
              >
                Rings
              </Link>


              <Link
                to="/category/necklaces"
                onClick={() =>
                  setCategoryOpen(false)
                }
              >
                Necklaces
              </Link>


              <Link
                to="/category/earrings"
                onClick={() =>
                  setCategoryOpen(false)
                }
              >
                Earrings
              </Link>


              <Link
                to="/category/bracelets"
                onClick={() =>
                  setCategoryOpen(false)
                }
              >
                Bracelets
              </Link>


              <Link
                to="/category/bangles"
                onClick={() =>
                  setCategoryOpen(false)
                }
              >
                Bangles
              </Link>


              <Link
                to="/category/pendants"
                onClick={() =>
                  setCategoryOpen(false)
                }
              >
                Pendants
              </Link>

            </div>

          )}

        </div>

      </div>


      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="navbar-right">


        {/* =========================
            SEARCH
        ========================= */}

        <div className="navbar-search">

          <Search
            size={18}
            onClick={handleSearch}
            style={{
              cursor: "pointer"
            }}
          />

          <input
            type="text"
            placeholder="Search jewellery..."
            value={searchText}
            onChange={(e) =>
              setSearchText(e.target.value)
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {
                handleSearch();
              }

            }}
          />

        </div>


        {/* =========================
            WISHLIST
        ========================= */}

        <Link
          to="/wishlist"
          className="navbar-icon"
          title="Wishlist"
        >

          <Heart size={20} />

        </Link>


        {/* =========================
            SHOPPING CART
        ========================= */}

        <Link
          to="/bag"
          className="navbar-icon navbar-bag"
          title="Shopping Cart"
        >

          <ShoppingCart
            size={21}
            strokeWidth={1.8}
          />


          {cartCount > 0 && (

            <span className="cart-count">
              {cartCount}
            </span>

          )}

        </Link>


        {/* =========================
            ACCOUNT
        ========================= */}

        <div className="navbar-account">

          <button
            type="button"
            className="account-button"
            onClick={() =>
              setAccountOpen(!accountOpen)
            }
            title="Account"
          >

            <UserRound size={20} />

          </button>


          {/* =========================
              ACCOUNT DROPDOWN
          ========================= */}

          {accountOpen && (

            <div className="account-dropdown">


              {/* ACCOUNT HEADER */}

              <div className="account-title">

                <span>
                  JEWELLERYHUB
                </span>

                <strong>
                  My Account
                </strong>

              </div>


              <div className="account-divider"></div>


              {/* =========================
                  MY ORDERS
              ========================= */}

              <Link
                to="/ordersu"
                onClick={() =>
                  setAccountOpen(false)
                }
              >

                <Package size={17} />

                <span>
                  My Orders
                </span>

              </Link>


              {/* =========================
                  WISHLIST
              ========================= */}

              <Link
                to="/wishlist"
                onClick={() =>
                  setAccountOpen(false)
                }
              >

                <Heart size={17} />

                <span>
                  Wishlist
                </span>

              </Link>


              {/* =========================
                  SIGN IN / PROFILE
              ========================= */}

              <Link
                to="/login"
                onClick={() =>
                  setAccountOpen(false)
                }
              >

                <User size={17} />

                <span>
                  Sign In / Create Account
                </span>

              </Link>


              <div className="account-divider"></div>


              {/* =========================
                  ABOUT
              ========================= */}

              <Link
                to="/about"
                onClick={() =>
                  setAccountOpen(false)
                }
              >

                <Info size={17} />

                <span>
                  About JewelleryHub
                </span>

              </Link>


              {/* =========================
                  CONTACT
              ========================= */}

              <Link
                to="/contact"
                onClick={() =>
                  setAccountOpen(false)
                }
              >

                <Mail size={17} />

                <span>
                  Contact Us
                </span>

              </Link>


              <div className="account-divider"></div>


              {/* =========================
                  LOGOUT
              ========================= */}

              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
              >

                <LogOut size={17} />

                <span>
                  Logout
                </span>

              </button>


            </div>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;