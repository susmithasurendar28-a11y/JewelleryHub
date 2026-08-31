import { useState } from "react";
import axios from "axios";

import "../../styles/addproduct.css";
import AdminSidebar from "../../components/AdminSidebar";

function AddProduct() {
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    price: "",
    originalPrice: "",
    discount: "",
    rating: "",
    image: "",
    quantity: ""
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://jewelleryhub-api.onrender.com/products", {
        productName: product.productName,
        category: product.category,
        price: Number(product.price),
        originalPrice: Number(product.originalPrice || 0),
        discount: Number(product.discount || 0),
        rating: Number(product.rating || 4.5),
        image: product.image,
        quantity: Number(product.quantity),
        stock: Number(product.quantity)
      })
      .then(() => {
        alert("Product added successfully!");

        setProduct({
          productName: "",
          category: "",
          price: "",
          originalPrice: "",
          discount: "",
          rating: "",
          image: "",
          quantity: ""
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to add product");
      });
  };

  const clearForm = () => {
    setProduct({
      productName: "",
      category: "",
      price: "",
      originalPrice: "",
      discount: "",
      rating: "",
      image: "",
      quantity: ""
    });
  };

  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="add-product-page">

        {/* HEADER */}

        <div className="add-product-header">

          <h1>
            Add Product
          </h1>

          <p>
            Add a new jewellery product to JewelleryHub
          </p>

        </div>


        <form
          className="add-product-form"
          onSubmit={handleSubmit}
        >

          {/* PRODUCT INFORMATION */}

          <div className="form-section">

            <h2>
              Product Information
            </h2>

            <div className="form-grid">

              {/* PRODUCT NAME */}

              <div className="form-group">

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

              <div className="form-group">

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

                  <option value="Bangles">
                    Bangles
                  </option>

                  <option value="Pendants">
                    Pendants
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* PRICING & STOCK */}

          <div className="form-section">

            <h2>
              Pricing & Stock
            </h2>

            <div className="form-grid">

              {/* SELLING PRICE */}

              <div className="form-group">

                <label>
                  Selling Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="₹ 0"
                  min="0"
                  required
                />

              </div>


              {/* ORIGINAL PRICE */}

              <div className="form-group">

                <label>
                  Original Price
                </label>

                <input
                  type="number"
                  name="originalPrice"
                  value={product.originalPrice}
                  onChange={handleChange}
                  placeholder="₹ 0"
                  min="0"
                />

              </div>


              {/* DISCOUNT */}

              <div className="form-group">

                <label>
                  Discount (%)
                </label>

                <input
                  type="number"
                  name="discount"
                  value={product.discount}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  max="100"
                />

              </div>


              {/* RATING */}

              <div className="form-group">

                <label>
                  Rating
                </label>

                <input
                  type="number"
                  name="rating"
                  value={product.rating}
                  onChange={handleChange}
                  placeholder="4.5"
                  min="1"
                  max="5"
                  step="0.1"
                />

              </div>


              {/* QUANTITY */}

              <div className="form-group">

                <label>
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  min="0"
                  required
                />

              </div>

            </div>

          </div>


          {/* PRODUCT IMAGE */}

          <div className="form-section">

            <h2>
              Product Image
            </h2>

            <div className="form-group">

              <label>
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="https://example.com/product-image.jpg"
                required
              />

              <small>
                Paste the product image URL here.
              </small>

            </div>


            {/* IMAGE PREVIEW */}

            {product.image && (

              <div className="image-preview">

                <img
                  src={product.image}
                  alt="Product Preview"
                />

              </div>

            )}

          </div>


          {/* BUTTONS */}

          <div className="form-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={clearForm}
            >
              Clear
            </button>

            <button
              type="submit"
              className="save-product-btn"
            >
              Add Product
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;