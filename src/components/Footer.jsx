import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* ================= MAIN FOOTER ================= */}

      <div className="footer-main">

        {/* BRAND */}

        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            Jewellery<span>Hub</span>
          </Link>

          <p>
            Discover timeless jewellery crafted to
            celebrate your style, beauty and special moments.
          </p>

          <div className="footer-socials">

            <a href="#" aria-label="Instagram">
              ◎
            </a>

            <a href="#" aria-label="Facebook">
              f
            </a>

            <a href="#" aria-label="Pinterest">
              p
            </a>

          </div>

        </div>


        {/* QUICK LINKS */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/collections">
            Collections
          </Link>

          <Link to="/new-arrivals">
            New Arrivals
          </Link>

          <Link to="/categories">
            Categories
          </Link>

        </div>


        {/* CUSTOMER CARE */}

        <div className="footer-column">

          <h3>Customer Care</h3>

          <Link to="/contact">
            Contact Us
          </Link>

          <Link to="/shipping">
            Shipping & Delivery
          </Link>

          <Link to="/returns">
            Returns & Exchanges
          </Link>

          <Link to="/faq">
            FAQs
          </Link>

        </div>


        {/* ABOUT */}

        <div className="footer-column">

          <h3>JewelleryHub</h3>

          <Link to="/about">
            About Us
          </Link>

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

          <Link to="/help">
            Help Center
          </Link>

        </div>

      </div>


      {/* ================= NEWSLETTER ================= */}

      <div className="footer-newsletter">

        <div>

          <p className="newsletter-label">
            STAY IN THE LOOP
          </p>

          <h3>
            Get jewellery inspiration in your inbox
          </h3>

          <p>
            Subscribe for new arrivals, exclusive offers
            and jewellery stories.
          </p>

        </div>


        <form className="newsletter-form">

          <input
            type="email"
            placeholder="Enter your email address"
          />

          <button type="submit">
            Subscribe
          </button>

        </form>

      </div>


      {/* ================= BOTTOM ================= */}

      <div className="footer-bottom">

        <p>
          © 2026 JewelleryHub. All rights reserved.
        </p>

        <p>
          Crafted with ♡ for jewellery lovers
        </p>

      </div>

    </footer>
  );
}

export default Footer;