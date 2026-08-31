import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/categories.css";

function Categories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/products"
      );

      setProducts(response.data);
    } catch (error) {
      console.log("Products error:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      name: "Rings",
      image:
        "https://media.istockphoto.com/id/1209865601/photo/beautiful-old-golden-ring-with-blue-gemstone-isolated-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=F6YNY13110JAKUOS1V0B6iUcX6KCkGgTu2MylLUWM8U=",
    },
    {
      name: "Necklaces",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2s35mCybJMNqqSGpDBqYbE9X2vehuoGBUleaqJ6yKTg&s=10",
    },
    {
      name: "Earrings",
      image:
        "https://media.istockphoto.com/id/2255283971/photo/pair-of-traditional-golden-mirror-work-earrings.jpg?s=612x612&w=0&k=20&c=wI03zcWY_-FI2njbQ8PvpsldX90bot9h7Bl9fHYhzvM=",
    },
    {
      name: "Bracelets",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaUDpJZJPvuwJpocjLzHPrd4iKK53SGwwRteJgzXThIA&s=10",
    },
    {
      name: "Bangles",
      image:
        "https://images.unsplash.com/photo-1690175867343-2af70ea57537?w=600",
    },
    {
      name: "Pendants",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKe9HzeR9Kfs7tpXw7NQWs_Wm48kmV7d2wBlvo_1hsA&s=10",
    },
  ];

  const getProductCount = (categoryName) => {
    return products.filter(
      (product) =>
        product.category?.trim().toLowerCase() ===
        categoryName.trim().toLowerCase()
    ).length;
  };

  // Go to ADMIN Products page with category filter
  const handleView = (categoryName) => {
    navigate(
      `/admin/products?category=${encodeURIComponent(categoryName)}`
    );
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="categories-page">

        {/* HEADER */}

        <div className="categories-header">
          <h1>Categories</h1>
          <p>Manage your jewellery categories</p>
        </div>


        {/* SUMMARY */}

        <div className="category-summary">

          <div className="category-summary-card">
            <div className="category-summary-icon">
              💎
            </div>

            <div>
              <span>Total Categories</span>
              <strong>{categories.length}</strong>
            </div>
          </div>


          <div className="category-summary-card">
            <div className="category-summary-icon">
              🛍️
            </div>

            <div>
              <span>Total Products</span>
              <strong>{products.length}</strong>
            </div>
          </div>


          <div className="category-summary-card">
            <div className="category-summary-icon">
              ✨
            </div>

            <div>
              <span>Active Categories</span>
              <strong>{categories.length}</strong>
            </div>
          </div>

        </div>


        {/* CATEGORY CARD */}

        <section className="categories-card">

          <div className="categories-card-header">

            <div>
              <h2>Jewellery Categories</h2>

              <p>
                Browse and manage products by category
              </p>
            </div>

            <span className="category-count">
              {categories.length} Categories
            </span>

          </div>


          {/* LOADING */}

          {loading ? (

            <div className="category-empty">
              <div className="empty-category-icon">
                💎
              </div>

              <h3>
                Loading Categories...
              </h3>
            </div>

          ) : (

            <div className="category-grid">

              {categories.map((category) => {

                const count = getProductCount(
                  category.name
                );

                return (

                  <div
                    className="category-item"
                    key={category.name}
                  >

                    {/* IMAGE */}

                    <div className="category-image">

                      <img
                        src={category.image}
                        alt={category.name}
                      />

                    </div>


                    {/* DETAILS */}

                    <div className="category-item-content">

                      <h3>
                        {category.name}
                      </h3>

                      <p>
                        {count}{" "}
                        {count === 1
                          ? "Product"
                          : "Products"}
                      </p>

                    </div>


                    {/* VIEW */}

                    <button
                      type="button"
                      className="category-view-btn"
                      onClick={() =>
                        handleView(category.name)
                      }
                    >
                      View →
                    </button>

                  </div>

                );
              })}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Categories;