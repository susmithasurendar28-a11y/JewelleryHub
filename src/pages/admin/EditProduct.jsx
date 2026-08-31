import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/editproduct.css";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    category: "",
    price: "",
    stock: "",
    rating: "",
    image: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get(`http://localhost:3000/products/${id}`)

      .then((response) => {

        setProduct({
          productName: response.data.productName || "",
          category: response.data.category || "",
          price: response.data.price || "",
          stock: response.data.stock || "",
          rating: response.data.rating || "",
          image: response.data.image || ""
        });

        setLoading(false);

      })

      .catch((error) => {

        console.log("Error:", error);

        alert("Product not found");

        navigate("/admin/products");

      });

  }, [id, navigate]);


  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.put(
        `http://localhost:3000/products/${id}`,
        {
          productName: product.productName,
          category: product.category,
          price: Number(product.price),
          stock: Number(product.stock),
          rating: Number(product.rating),
          image: product.image
        }
      );

      alert("Product updated successfully!");

      navigate("/admin/products");

    } catch (error) {

      console.log("Update error:", error);

      alert("Failed to update product");

    }

  };


  if (loading) {

    return (

      <div className="admin-layout">

        <AdminSidebar />

        <main className="edit-product-page">

          <div className="edit-loading">
            Loading product...
          </div>

        </main>

      </div>

    );

  }


  return (

    <div className="admin-layout">

      <AdminSidebar />

      <main className="edit-product-page">

        {/* HEADER */}

        <div className="edit-product-header">

          <div>

            <h1>
              Edit Product
            </h1>

            <p>
              Update your JewelleryHub product details
            </p>

          </div>

        </div>


        {/* FORM */}

        <form
          className="edit-product-form"
          onSubmit={handleSubmit}
        >

          {/* PRODUCT INFORMATION */}

          <div className="edit-section">

            <div className="section-title">

              <div className="section-icon">
                💎
              </div>

              <div>

                <h2>
                  Product Information
                </h2>

                <p>
                  Update basic product details
                </p>

              </div>

            </div>


            <div className="edit-grid">

              {/* PRODUCT NAME */}

              <div className="edit-group full-width">

                <label>
                  Product Name
                </label>

                <input
                  type="text"
                  name="productName"
                  value={product.productName}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />

              </div>


              {/* CATEGORY */}

              <div className="edit-group">

                <label>
                  Category
                </label>

                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Category
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

                  <option value="bangles">
                    Bangles
                  </option>

                  <option value="Pendants">
                    Pendants
                  </option>

                </select>

              </div>


              {/* RATING */}

              <div className="edit-group">

                <label>
                  Rating
                </label>

                <input
                  type="number"
                  name="rating"
                  value={product.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  step="0.1"
                  placeholder="4.5"
                  required
                />

              </div>

            </div>

          </div>


          {/* PRICING */}

          <div className="edit-section">

            <div className="section-title">

              <div className="section-icon">
                ₹
              </div>

              <div>

                <h2>
                  Pricing & Stock
                </h2>

                <p>
                  Update price and available quantity
                </p>

              </div>

            </div>


            <div className="edit-grid">

              {/* PRICE */}

              <div className="edit-group">

                <label>
                  Selling Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  min="0"
                  required
                />

              </div>


              {/* STOCK */}

              <div className="edit-group">

                <label>
                  Stock Quantity
                </label>

                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  min="0"
                  required
                />

              </div>

            </div>

          </div>


          {/* IMAGE */}

          <div className="edit-section">

            <div className="section-title">

              <div className="section-icon">
                🖼️
              </div>

              <div>

                <h2>
                  Product Image
                </h2>

                <p>
                  Update the product image
                </p>

              </div>

            </div>


            <div className="edit-group">

              <label>
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="Paste product image URL"
                required
              />

            </div>


            {product.image && (

              <div className="edit-image-preview">

                <img
                  src={product.image}
                  alt={product.productName}
                />

              </div>

            )}

          </div>


          {/* BUTTONS */}

          <div className="edit-buttons">

            <button
              type="button"
              className="back-btn"
              onClick={() =>
                navigate("/admin/products")
              }
            >
              Cancel
            </button>


            <button
              type="submit"
              className="update-btn"
            >
              Update Product
            </button>

          </div>

        </form>

      </main>

    </div>

  );

}

export default EditProduct;