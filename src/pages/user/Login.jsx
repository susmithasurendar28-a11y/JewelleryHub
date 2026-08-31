import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {

    e.preventDefault();


    // Convert email to lowercase
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();


    // Check empty fields
    if (!cleanEmail || !cleanPassword) {

      alert("Please enter email and password");

      return;
    }


    try {

      // Get registered users
      const response = await axios.get(
        "https://jewelleryhub-api.onrender.com/users"
      );


      // Find matching user
      const user = response.data.find(
        (item) =>
          item.email.toLowerCase() === cleanEmail &&
          item.password === cleanPassword
      );


      // Invalid login
      if (!user) {

        alert(
          "Invalid email or password. Please check your details."
        );

        return;
      }


      // Save logged-in user
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        })
      );


      alert("Login successful!");


      // Go to home page
      navigate("/");


    } catch (error) {

      console.log(error);

      alert(
        "Unable to login. Please make sure JSON Server is running."
      );

    }
  };


  return (

    <div className="login-page">


      {/* =========================
          LEFT SIDE
      ========================= */}

      <div className="login-image">

        <div className="login-overlay">

          <span>
            JEWELLERYHUB
          </span>

          <h1>
            Elegance that
            <br />
            stays with you.
          </h1>

          <p>
            Discover timeless jewellery designed
            for every beautiful moment.
          </p>

        </div>

      </div>



      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="login-section">

        <div className="login-box">


          {/* LOGO */}

          <div className="login-logo">

            Jewellery<span>Hub</span>

          </div>


          <p className="login-welcome">
            Welcome back
          </p>


          <h2>
            Sign in to your account
          </h2>


          <p className="login-subtitle">
            Enter your details to continue shopping.
          </p>



          {/* =========================
              LOGIN FORM
          ========================= */}

          <form onSubmit={handleLogin}>


            {/* EMAIL */}

            <div className="login-field">

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value.toLowerCase())
                }
                required
              />

            </div>



            {/* PASSWORD */}

            <div className="login-field">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>



            {/* OPTIONS */}

            <div className="login-options">

              <label>

                <input
                  type="checkbox"
                />

                Remember me

              </label>


              <button
                type="button"
                className="forgot-password"
                onClick={() =>
                  alert(
                    "Password recovery is not available in this demo."
                  )
                }
              >
                Forgot Password?
              </button>

            </div>



            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
            >
              Sign In
            </button>


          </form>



          {/* DIVIDER */}

          <div className="login-divider">

            <span>
              OR
            </span>

          </div>



          {/* REGISTER */}

          <p className="register-text">

            Don't have an account?

            {" "}

            <Link to="/register">
              Create Account
            </Link>

          </p>



          {/* BACK HOME */}

          <Link
            to="/"
            className="back-home"
          >
            ← Back to JewelleryHub
          </Link>


        </div>

      </div>

    </div>
  );
}


export default Login;