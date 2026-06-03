import React, { useContext } from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const CustomNavbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Navbar fixed="top" bg={theme === "dark" ? "dark" : "light"} variant={theme === "dark" ? "dark" : "light"} expand="lg" className="shadow-sm">
      <Container fluid className="px-4">
        {/* Logo/Brand */}
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-3 d-flex align-items-center">
          <img src="/image/mallverse.png" alt="MallVerse Logo" style={{ height: "40px", objectFit: "contain", marginRight: "10px" }} />
        </Navbar.Brand>

        {/* Hamburger toggle button for mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Nav links and buttons */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/services">Services</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                <Nav.Link as={Link} to="/wishlist">Wishlist</Nav.Link>
              </>
            )}
            {isAdmin && (
              <Nav.Link as={Link} to="/admin/dashboard" className="text-danger fw-bold">Admin Dashboard</Nav.Link>
            )}

            <Button 
              variant={theme === "dark" ? "outline-light" : "outline-dark"} 
              size="sm" 
              className="ms-2 rounded-circle"
              onClick={toggleTheme}
              style={{ width: "36px", height: "36px" }}
              title="Toggle Theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </Button>
          </Nav>

          {/* Authentication buttons */}
          <div className="d-flex gap-3 ms-lg-3 mt-3 mt-lg-0 align-items-center">
            {!isLoggedIn ? (
              <>
                <Button variant="outline-primary" onClick={() => navigate("/logIn")}>Login</Button>
                <Button variant="primary" onClick={() => navigate("/register")}>Sign Up</Button>
              </>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Hi, {user?.name || "User"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">My Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => { logout(); navigate("/logIn"); }} className="text-danger">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
