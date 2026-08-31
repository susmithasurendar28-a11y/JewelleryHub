import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/adminlogin.css";


function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (
      email === "susmitha@gmail.com" &&
      password === "susmitha123"
    ) {
      localStorage.setItem("adminLoggedIn", "true");

      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin email or password");
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-logo">
          JH
        </div>

        <h1>JewelleryHub</h1>

        <p className="admin-login-subtitle">
          Admin Panel
        </p>

        <form onSubmit={handleLogin}>

          <div className="login-field">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div className="login-field">

            <label>Password</label>

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="show-password"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-login-button"
          >
            Login to Dashboard
          </button>

        </form>

        <p className="admin-login-footer">
          JewelleryHub Admin Portal
        </p>

      </div>

    </div>
  );
}

export default AdminLogin;