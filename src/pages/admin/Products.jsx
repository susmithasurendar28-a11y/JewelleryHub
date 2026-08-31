import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "All";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://jewelleryhub-api.onrender.com/products"
      );

      setProducts(response.data);
    } catch (error) {
      console.log("Products error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `https://jewelleryhub-api.onrender.com/products/${id}`
      );

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) => product.id !== id
        )
      );
    } catch (error) {
      console.log("Delete error:", error);
      alert("Failed to delete product");
    }
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category?.trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase()
        );

  const totalProducts = filteredProducts.length;

  const inStockProducts = filteredProducts.filter(
    (product) =>
      Number(
        product.stock ?? product.quantity ?? 0
      ) > 0
  ).length;

  const lowStockProducts = filteredProducts.filter(
    (product) => {
      const stock = Number(
        product.stock ?? product.quantity ?? 0
      );

      return stock > 0 && stock <= 5;
    }
  ).length;

  const totalCategories = new Set(
    products
      .map((product) => product.category)
      .filter(Boolean)
  ).size;

  const handleCategoryChange = (event) => {
    const value = event.target.value;

    if (value === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: value
      });
    }
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <main className="products-page">

        {/* HEADER */}

        <div className="products-header">

          <div>
            <h1>Products</h1>

            <p>
              {selectedCategory === "All"
                ? "View and manage your jewellery collection"
                : `Showing ${selectedCategory} products`}
            </p>
          </div>

          <Link
            to="/admin/products/add"
            className="add-product-btn"
          >
            + Add Product
          </Link>

        </div>


        {/* SUMMARY CARDS */}

        <div className="products-summary">

          <div className="summary-card">

            <div className="summary-icon">
              💎
            </div>

            <div>
              <span>Total Products</span>
              <strong>{totalProducts}</strong>
            </div>

          </div>


          <div className="summary-card">

            <div className="summary-icon">
              📦
            </div>

            <div>
              <span>In Stock</span>
              <strong>{inStockProducts}</strong>
            </div>

          </div>


          <div className="summary-card">

            <div className="summary-icon">
              ⚠️
            </div>

            <div>
              <span>Low Stock</span>
              <strong>{lowStockProducts}</strong>
            </div>

          </div>


          <div className="summary-card">

            <div className="summary-icon">
              🗂️
            </div>

            <div>
              <span>Categories</span>
              <strong>{totalCategories}</strong>
            </div>

          </div>

        </div>


        {/* PRODUCTS CARD */}

        <section className="products-card">

          <div className="products-card-header">

            <div>

              <h2>
                {selectedCategory === "All"
                  ? "All Products"
                  : `${selectedCategory} Products`}
              </h2>

              <p>
                Manage your jewellery products
              </p>

            </div>


            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="category-filter"
            >

              <option value="All">
                All Categories
              </option>

              <option value="Rings">
                Rings
              </option>

              <option value="Necklaces">
                Necklaces
              </option>

              <option value="Earrings">
                Earrings
              </option>

              <option value="Bracelets">
                Bracelets
              </option>

              <option value="Bangles">
                Bangles
              </option>

              <option value="Pendants">
                Pendants
              </option>

            </select>

          </div>


          {/* LOADING */}

          {loading ? (

            <div className="products-message">
              Loading products...
            </div>

          ) : filteredProducts.length === 0 ? (

            <div className="products-message">

              <div className="empty-icon">
                💎
              </div>

              <h3>
                No Products Found
              </h3>

              <p>
                No products are available
                in this category.
              </p>

            </div>

          ) : (

            <div className="products-table-wrapper">

              <table className="products-table">

                <thead>

                  <tr>

                    <th>
                      Product Name
                    </th>

                    <th>
                      Category
                    </th>

                    <th>
                      Price
                    </th>

                    <th>
                      Stock
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredProducts.map(
                    (product) => {

                      const stock = Number(
                        product.stock ??
                        product.quantity ??
                        0
                      );

                      let status = "Available";
                      let statusClass = "available";

                      if (stock === 0) {
                        status = "Out of Stock";
                        statusClass = "out";
                      } else if (stock <= 5) {
                        status = "Low Stock";
                        statusClass = "low";
                      }

                      return (

                        <tr key={product.id}>

                          <td>

                            <div className="product-info">

                              <img
                                src={product.image}
                                alt={product.productName}
                              />

                              <div>

                                <strong>
                                  {product.productName}
                                </strong>

                                <span>
                                  {product.brand ||
                                    "JewelleryHub"}
                                </span>

                              </div>

                            </div>

                          </td>


                          <td>

                            <div className="category-info">

                              <span>
                                {product.category ||
                                  "Jewellery"}
                              </span>

                              {product.subCategory && (
                                <small>
                                  {product.subCategory}
                                </small>
                              )}

                            </div>

                          </td>


                          <td>

                            <span className="product-price">

                              ₹
                              {Number(
                                product.price || 0
                              ).toLocaleString("en-IN")}

                            </span>

                          </td>


                          <td>

                            <span
                              className={
                                stock <= 5
                                  ? "stock-badge low"
                                  : "stock-badge"
                              }
                            >
                              {stock} left
                            </span>

                          </td>


                          <td>

                            <span
                              className={`status-badge ${statusClass}`}
                            >
                              {status}
                            </span>

                          </td>


                          <td>

                            <div className="product-actions">

                              <Link
                                to={`/admin/products/edit/${product.id}`}
                                className="edit-btn"
                              >
                                Edit
                              </Link>

                              <button
                                onClick={() =>
                                  deleteProduct(product.id)
                                }
                                className="delete-btn"
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Products;