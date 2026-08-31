import { useState } from "react";
import "../../styles/settings.css";
import AdminSidebar from "../../components/AdminSidebar";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [storeOpen, setStoreOpen] = useState(true);

  const [profile, setProfile] = useState({
    name: "JewelleryHub Admin",
    email: "susmitha@gmail.com",
    phone: "9876543210",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handlePassword = () => {
    const newPassword = window.prompt(
      "Enter your new admin password:"
    );

    if (!newPassword) {
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    alert("Admin password changed successfully!");
  };

  return (
    <div className="admin-layout">

      {/* ADMIN SIDEBAR */}
      <AdminSidebar />

      {/* SETTINGS CONTENT */}
      <main className="settings-page">

        {/* HEADER */}
        <div className="settings-header">
          <div>
            <h1>Settings</h1>

            <p>
              Manage your JewelleryHub admin settings
            </p>
          </div>
        </div>


        {/* ADMIN PROFILE */}
        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-title-icon">
              👤
            </div>

            <div>
              <h2>Admin Profile</h2>

              <p>
                Update your administrator information
              </p>
            </div>

          </div>


          <form onSubmit={handleSave}>

            <div className="settings-form-grid">

              {/* ADMIN NAME */}
              <div className="settings-field">

                <label>
                  Admin Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter admin name"
                />

              </div>


              {/* EMAIL */}
              <div className="settings-field">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />

              </div>


              {/* PHONE */}
              <div className="settings-field">

                <label>
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />

              </div>

            </div>


            <div className="settings-save-area">

              <button
                type="submit"
                className="settings-save-button"
              >
                Save Changes
              </button>

              {saved && (
                <span className="save-message">
                  ✓ Settings saved successfully
                </span>
              )}

            </div>

          </form>

        </section>


        {/* STORE SETTINGS */}
        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-title-icon">
              🏪
            </div>

            <div>
              <h2>Store Settings</h2>

              <p>
                Control your JewelleryHub store
              </p>
            </div>

          </div>


          <div className="settings-option">

            <div className="option-content">

              <h3>
                Store Status
              </h3>

              <p>
                Allow customers to browse and purchase
                products
              </p>

            </div>


            <div className="option-right">

              <span
                className={
                  storeOpen
                    ? "status-text open"
                    : "status-text closed"
                }
              >
                {storeOpen ? "Store Open" : "Store Closed"}
              </span>

              <button
                type="button"
                className={
                  storeOpen
                    ? "toggle active"
                    : "toggle"
                }
                onClick={() => setStoreOpen(!storeOpen)}
              >
                <span></span>
              </button>

            </div>

          </div>

        </section>


        {/* NOTIFICATIONS */}
        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-title-icon">
              🔔
            </div>

            <div>
              <h2>Notifications</h2>

              <p>
                Choose which notifications you receive
              </p>
            </div>

          </div>


          {/* ORDER NOTIFICATIONS */}
          <div className="settings-option">

            <div className="option-content">

              <h3>
                Order Notifications
              </h3>

              <p>
                Receive notifications when a new order
                is placed
              </p>

            </div>


            <button
              type="button"
              className={
                notifications
                  ? "toggle active"
                  : "toggle"
              }
              onClick={() =>
                setNotifications(!notifications)
              }
            >
              <span></span>
            </button>

          </div>


          {/* EMAIL ALERTS */}
          <div className="settings-option">

            <div className="option-content">

              <h3>
                Email Alerts
              </h3>

              <p>
                Receive important updates through email
              </p>

            </div>


            <button
              type="button"
              className={
                emailAlerts
                  ? "toggle active"
                  : "toggle"
              }
              onClick={() =>
                setEmailAlerts(!emailAlerts)
              }
            >
              <span></span>
            </button>

          </div>

        </section>


        {/* SECURITY */}
        <section className="settings-card">

          <div className="settings-card-header">

            <div className="settings-title-icon">
              🔐
            </div>

            <div>
              <h2>Security</h2>

              <p>
                Manage your admin account security
              </p>
            </div>

          </div>


          <div className="security-row">

            <div className="option-content">

              <h3>
                Password
              </h3>

              <p>
                Change your admin account password
              </p>

            </div>


            <button
              type="button"
              className="change-password-button"
              onClick={handlePassword}
            >
              Change Password
            </button>

          </div>

        </section>


        {/* FOOTER */}
        <div className="settings-footer">

          <span>
            JewelleryHub Admin Panel
          </span>

          <span>
            Settings & Security
          </span>

        </div>

      </main>

    </div>
  );
}

export default Settings;