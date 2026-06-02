import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login, isLoggedIn } = useContext(AuthContext);

  // If already logged in, go to home
  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

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
        handleSuccess("Login successful!");
        login(result.token || "dummy-token", result.user);

        setTimeout(() => {
          if (!result.user?.isVerified) return navigate("/emailverification");
          navigate("/home");
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
      className="container mt-5 p-4 shadow rounded"
      style={{ maxWidth: "400px", backgroundColor: "#f8f9fa" }}
    >
      <h2 className="mb-4 text-center text-success fw-bold">Login</h2>

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control border-success"
            placeholder="Enter your email..."
            value={loginInfo.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control border-success"
            placeholder="Enter your password..."
            value={loginInfo.password}
            onChange={handleChange}
            required
          />
        </div>

        <p
          className="text-primary mb-3 text-end"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>

        <button type="submit" className="btn btn-success w-100 fw-semibold">
          Login
        </button>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/register" className="text-success fw-semibold">
            Signup
          </Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
}

export default LoginPage;
