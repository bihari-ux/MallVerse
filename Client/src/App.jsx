import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import CustomNavbar from "./components/Navbar";
import ProductPage from "./pages/ProductPage";
import AdminPanel from "./pages/AdminPanel";
import AdminLoginPage from "./pages/AdminLoginPage";
import Footer from "./components/Footer";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <CustomNavbar />
        <div className="pt-5 flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/secret-admin-login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminPanel />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/logIn" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
      </div>
    </Router>
  );
};

export default App;
