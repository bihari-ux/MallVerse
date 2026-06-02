import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

function AdminLoginPage() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login, isLoggedIn, isAdmin } = useContext(AuthContext);

  // If already logged in as admin, go to dashboard
  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [isLoggedIn, isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleError = (msg) =>
    toast.error(msg, {
      position: "top-center",
      autoClose: 3000,
      pauseOnHover: true,
      theme: "colored",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: false,
      theme: "colored",
    });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        if (!result.token) {
          handleError("Server did not return a token.");
          return;
        }

        // Strictly check for admin role
        if (result.user?.role !== "admin") {
          handleError("Access Denied: Not an admin account.");
          return;
        }

        handleSuccess("Admin Login successful!");
        login(result.token, result.user);

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
      } else {
        handleError(result.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      handleError("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="container mt-5 p-5 shadow-lg rounded"
      style={{ maxWidth: "450px", backgroundColor: "#212529", color: "white" }}
    >
      <div className="text-center mb-4">
        <h1 style={{ fontSize: "50px" }}>🛡️</h1>
        <h2 className="text-danger fw-bold">Admin Portal</h2>
        <p className="text-muted">Restricted Access</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-light">
            Admin Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control border-danger bg-dark text-white"
            placeholder="admin@example.com"
            value={loginInfo.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label text-light">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control border-danger bg-dark text-white"
            placeholder="••••••••"
            value={loginInfo.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-danger w-100 fw-bold py-2">
          Login to Dashboard
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default AdminLoginPage;
