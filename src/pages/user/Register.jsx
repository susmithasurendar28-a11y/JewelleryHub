import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "email"
          ? value.toLowerCase()
          : value,
    });
  };


  const handleRegister = async (e) => {

    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;


    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }


    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }


    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10 digit phone number");
      return;
    }


    if (password.length < 6) {
      alert("Password must contain at least 6 characters");
      return;
    }


    try {

      const response = await axios.get(
        "https://jewelleryhub-api.onrender.com/users"
      );


      const existingUser = response.data.find(
        (user) =>
          user.email.toLowerCase() === email
      );


      if (existingUser) {
        alert("Email already registered. Please login.");
        return;
      }


      await axios.post(
        "https://jewelleryhub-api.onrender.com/users",
        {
          name,
          email,
          phone,
          password,
        }
      );


      alert("Registration successful! Please login.");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        "Registration failed. Please check JSON Server."
      );

    }
  };


  return (
    <div className="register-page">

      {/* LEFT SIDE */}

      <div className="register-image">

        <div className="register-image-content">

          <span>JEWELLERYHUB</span>

          <h1>
            Find something
            <br />
            truly beautiful.
          </h1>

          <p>
            Explore elegant jewellery collections
            crafted to make every occasion special.
          </p>

        </div>

      </div>


      {/* RIGHT SIDE */}

      <div className="register-section">

        <div className="register-box">

          <div className="register-logo">
            Jewellery<span>Hub</span>
          </div>

          <p className="register-welcome">
            Join JewelleryHub
          </p>

          <h2>
            Create your account
          </h2>

          <p className="register-subtitle">
            Sign up to discover our beautiful jewellery collection.
          </p>


          <form onSubmit={handleRegister}>

            {/* NAME */}

            <div className="register-field">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* EMAIL */}

            <div className="register-field">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            {/* PHONE */}

            <div className="register-field">

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="register-field">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="register-field">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

            </div>


            <button
              type="submit"
              className="register-button"
            >
              Create Account
            </button>

          </form>


          <p className="already-account">

            Already have an account?

            <Link to="/login">
              Sign In
            </Link>

          </p>


          <Link
            to="/"
            className="register-back-home"
          >
            ← Back to JewelleryHub
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;