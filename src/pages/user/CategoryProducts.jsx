import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import "../../styles/categoryProducts.css";

function CategoryProducts() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const searchText = searchParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  useEffect(() => {
    fetch("https://jewelleryhub-api.onrender.com/products")
      .then((response) => response.json())
      .then((data) => {
        let filteredProducts = data;

        if (category && category.toLowerCase() !== "all") {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.category?.toLowerCase() ===
              category.toLowerCase()
          );
        }

        if (searchText.trim() !== "") {
          const search = searchText.trim().toLowerCase();

          filteredProducts = filteredProducts.filter((product) => {
            const productName =
              product.productName?.toLowerCase() || "";

            const productCategory =
              product.category?.toLowerCase() || "";

            return (
              productName.includes(search) ||
              productCategory.includes(search)
            );
          });
        }

        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error loading products:", error);
        setLoading(false);
      });
  }, [category, searchText]);

  const toggleWishlist = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    const oldWishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyAdded = oldWishlist.some(
      (item) => String(item.id) === String(product.id)
    );

    let newWishlist;

    if (alreadyAdded) {
      newWishlist = oldWishlist.filter(
        (item) => String(item.id) !== String(product.id)
      );
    } else {
      newWishlist = [...oldWishlist, product];
    }

    localStorage.setItem(
      "wishlist",
      JSON.stringify(newWishlist)
    );

    setWishlist(newWishlist);
  };

  const isWishlisted = (id) => {
    return wishlist.some(
      (item) => String(item.id) === String(id)
    );
  };

  let title = "Collections";

  if (searchText.trim() !== "") {
    title =
      searchText.charAt(0).toUpperCase() +
      searchText.slice(1);
  } else if (
    category &&
    category.toLowerCase() !== "all"
  ) {
    title =
      category.charAt(0).toUpperCase() +
      category.slice(1);
  }

  return (
    <div className="category-page">

      <Navbar />

      <section className="category-heading">

        <p className="small-heading">
          JEWELLERY COLLECTION
        </p>

        <h1>{title}</h1>

        <div className="heading-line"></div>

      </section>

      <section className="category-products">

        {loading ? (

          <div className="loading">
            Loading products...
          </div>

        ) : products.length === 0 ? (

          <div className="no-products">

            <h2>No Products Found</h2>

            <p>
              We couldn't find matching jewellery.
            </p>

          </div>

        ) : (

          <div className="products-grid">

            {products.map((product) => (

              <Link
                to={`/product/${product.id}`}
                className="product-card"
                key={product.id}
              >

                <div className="product-image-wrapper">

                  <img
                    src={product.image}
                    alt={product.productName}
                    className="product-image"
                  />

                </div>

                <div className="product-info">

                  <h3>
                    {product.productName}
                  </h3>

                  <div className="product-details">

                    <span className="product-price">
                      ₹
                      {Number(product.price).toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    <span className="product-rating">
                      ★ {product.rating}
                    </span>

                  </div>

                  <button
                    type="button"
                    className={
                      isWishlisted(product.id)
                        ? "wishlist-button wishlist-added"
                        : "wishlist-button"
                    }
                    onClick={(event) =>
                      toggleWishlist(event, product)
                    }
                  >
                    {isWishlisted(product.id)
                      ? "Added to Wishlist"
                      : "Add to Wishlist"}
                  </button>

                </div>

              </Link>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default CategoryProducts;