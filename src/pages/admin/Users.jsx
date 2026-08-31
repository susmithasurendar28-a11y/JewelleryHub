import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../../components/AdminSidebar";
import "../../styles/users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/users"
      );

      setUsers(response.data);
    } catch (error) {
      console.log("Users error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete customer
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/users/${id}`
      );

      setUsers((previousUsers) =>
        previousUsers.filter((user) => user.id !== id)
      );
    } catch (error) {
      console.log("Delete error:", error);
      alert("Failed to delete customer");
    }
  };

  return (
    <div className="admin-layout">

      {/* ADMIN SIDEBAR */}
      <AdminSidebar />

      {/* USERS CONTENT */}
      <main className="users-page">

        {/* HEADER */}
        <div className="users-header">

          <div>
            <h1>Customers</h1>

            <p>
              Manage registered JewelleryHub customers
            </p>
          </div>

          <div className="user-count">
            <span>Total Customers</span>

            <strong>
              {users.length}
            </strong>
          </div>

        </div>


        {/* USERS CARD */}
        <section className="users-card">

          {/* CARD HEADER */}
          <div className="users-card-header">

            <div>
              <h2>Registered Customers</h2>

              <p>
                Customers who registered on JewelleryHub
              </p>
            </div>

            <span className="customer-count">
              {users.length} Customers
            </span>

          </div>


          {/* LOADING */}
          {loading ? (

            <div className="users-message">
              <div className="loading-icon">⏳</div>
              <h3>Loading Customers...</h3>
              <p>Please wait while we load customer details.</p>
            </div>

          ) : users.length === 0 ? (

            /* EMPTY */
            <div className="users-message">

              <div className="empty-icon">
                👤
              </div>

              <h3>
                No Customers Found
              </h3>

              <p>
                Registered customers will appear here.
              </p>

            </div>

          ) : (

            /* TABLE */
            <div className="users-table-wrapper">

              <table className="users-table">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Customer ID</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {users.map((user, index) => {

                    const name =
                      user.name ||
                      user.username ||
                      "Customer";

                    const firstLetter =
                      name.charAt(0).toUpperCase();

                    return (

                      <tr key={user.id}>

                        {/* NUMBER */}
                        <td className="serial-number">
                          {index + 1}
                        </td>


                        {/* CUSTOMER */}
                        <td>

                          <div className="customer-info">

                            <div className="customer-avatar">
                              {firstLetter}
                            </div>

                            <div className="customer-details">

                              <strong>
                                {name}
                              </strong>

                              <span>
                                Registered Customer
                              </span>

                            </div>

                          </div>

                        </td>


                        {/* EMAIL */}
                        <td>
                          <span className="customer-email">
                            {user.email || "-"}
                          </span>
                        </td>


                        {/* PHONE */}
                        <td>
                          {user.phone || "-"}
                        </td>


                        {/* CUSTOMER ID */}
                        <td>

                          <span className="customer-id">
                            #{user.id}
                          </span>

                        </td>


                        {/* DELETE */}
                        <td>

                          <button
                            className="user-delete"
                            onClick={() =>
                              handleDelete(user.id)
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    );
                  })}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Users;