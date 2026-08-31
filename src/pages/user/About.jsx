import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/about.css";

function About() {
  return (
    <>
      <Navbar />

      <main className="about-page">

        <section className="about-hero">

          <span>JEWELLERYHUB</span>

          <h1>
            Timeless Jewellery,
            <br />
            Made for You
          </h1>

          <p>
            Discover elegant jewellery designed to make
            every special moment shine.
          </p>

        </section>


        <section className="about-content">

          <div className="about-section">

            <span className="about-label">
              OUR STORY
            </span>

            <h2>
              Welcome to JewelleryHub
            </h2>

            <p>
              JewelleryHub is a modern online jewellery
              shopping platform created for people who
              love elegant and timeless designs.
            </p>

            <p>
              From everyday accessories to beautiful
              statement pieces, we bring together a
              carefully selected collection of jewellery
              for every occasion.
            </p>

          </div>


          <div className="about-features">

            <div className="about-feature">

              <div className="about-feature-icon">
                ✦
              </div>

              <h3>
                Elegant Designs
              </h3>

              <p>
                Carefully selected designs that add
                elegance to every look.
              </p>

            </div>


            <div className="about-feature">

              <div className="about-feature-icon">
                ♢
              </div>

              <h3>
                Quality Products
              </h3>

              <p>
                We focus on providing beautiful and
                reliable jewellery products.
              </p>

            </div>


            <div className="about-feature">

              <div className="about-feature-icon">
                ♡
              </div>

              <h3>
                Customer First
              </h3>

              <p>
                Your shopping experience and satisfaction
                are always important to us.
              </p>

            </div>

          </div>


          <section className="about-cta">

            <h2>
              Find Something Beautiful
            </h2>

            <p>
              Explore our jewellery collection and
              discover a piece that speaks to you.
            </p>

            <Link
              to="/collections"
              className="about-shop-button"
            >
              Explore Collection
            </Link>

          </section>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default About;