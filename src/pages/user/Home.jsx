import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import "../../styles/home.css";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jewelleryhub-api.onrender.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("Products error:", error);
      });
  }, []);

  const banners = [
    {
      image:
        "https://media.istockphoto.com/id/1276740597/photo/indian-traditional-gold-necklace.webp?a=1&b=1&s=612x612&w=0&k=20&c=hPxwL517Qk0HuDOcs3E_LWgVzZLJQNnpueX58kMRbmE=",
      title: "Timeless Elegance",
      text: "Discover jewellery designed to make every moment unforgettable.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&auto=format&fit=crop&q=60",
      title: "Shine Your Way",
      text: "Elegant pieces crafted to complement your unique style.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop&q=60",
      title: "Beauty in Every Detail",
      text: "Find beautiful designs made for your special moments.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const categories = [
    {
      name: "Rings",
      image:
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "Necklaces",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGB-3yy6nGF-tysFQl9uP3DN-sRTil-kv49q8MiHtsgA&s=10",
    },
    {
      name: "Earrings",
      image:
        "https://media.istockphoto.com/id/1162902447/photo/fancy-designer-golden-earrings-pair-for-woman-fashion.jpg?s=612x612&w=0&k=20&c=nJz0NRqK9gaPOts9muQ7m1hZub7npHxrn9olzii6teA=",
    },
    {
      name: "Bracelets",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnGHpoNX0iPHbys9bQIEyPqaSAmN8-oUkjoydczQ6Vvg&s=10",
    },
    {
      name: "Bangles",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGHt_7cwJ6pKlm-9jzfyU5F1En--qsWWKEpn_ppFQlVA&s=10",
    },
    {
      name: "Pendants",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKe9HzeR9Kfs7tpXw7NQWs_Wm48kmV7d2wBlvo_1hsA&s=10",
    },
  ];

  // Get only products having newArrival: true
  const newArrivals = products.filter(
    (product) => product.newArrival === true
  );

  const handleViewProduct = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <>
      <Navbar />

      <main className="home-page">

        {/* BANNER */}

        <section className="home-banner">

          {banners.map((banner, index) => (
            <div
              key={index}
              className={`banner-slide ${
                currentSlide === index ? "show" : ""
              }`}
            >
              <img
                src={banner.image}
                alt={banner.title}
              />

              <div className="banner-overlay"></div>

              <div className="banner-content">

                <span>JEWELLERYHUB</span>

                <h1>{banner.title}</h1>

                <p>{banner.text}</p>

                <Link
                  to="/collections"
                  className="banner-button"
                >
                  Explore Collection
                </Link>

              </div>
            </div>
          ))}

          <div className="banner-dots">

            {banners.map((_, index) => (
              <button
                key={index}
                type="button"
                className={
                  currentSlide === index
                    ? "dot active"
                    : "dot"
                }
                onClick={() => setCurrentSlide(index)}
              />
            ))}

          </div>

        </section>


        {/* CATEGORIES */}

        <section className="categories-section">

          <div className="section-heading">

            <span>SHOP BY CATEGORY</span>

            <h2>Explore Our Jewellery</h2>

            <p>
              Discover elegant pieces designed for every occasion.
            </p>

          </div>

          <div className="category-grid">

            {categories.map((category) => (

              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`}
                className="category-card"
              >

                <div className="category-image">

                  <img
                    src={category.image}
                    alt={category.name}
                  />

                </div>

                <div className="category-card-content">

                  <h3>{category.name}</h3>

                  <span className="category-shop-link">
                    Explore Collection
                  </span>

                </div>

              </Link>

            ))}

          </div>

        </section>


        {/* NEW ARRIVALS */}

        <section
          className="new-section"
          id="new-arrivals"
        >

          <div className="section-heading">

            <span>NEW ARRIVALS</span>

            <h2>Latest Jewellery</h2>

            <p>
              Discover our newest pieces and timeless designs.
            </p>

          </div>

          <div className="new-products">

            {newArrivals.map((product) => (

              <div
                className="new-product-card"
                key={product.id}
              >

                <div className="new-product-image">

                  <span className="new-label">
                    NEW
                  </span>

                  <img
                    src={product.image}
                    alt={product.productName}
                  />

                </div>

                <div className="new-product-info">

                  <h3>
                    {product.productName}
                  </h3>

                  <p>
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleViewProduct(product)}
                  >
                    View Product
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Home;