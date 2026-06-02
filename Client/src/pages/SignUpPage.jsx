import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function SignUpPage() {
  const { isLoggedIn } = useContext(AuthContext);
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // If already logged in, go to home
  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleError = (message) => toast.error(message);
  const handleSuccess = (message) => toast.success(message);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError("All fields are required.");
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        const details =
          error?.details?.[0]?.message || message || "Registration failed";
        handleError(details);
      }
    } catch (err) {
      handleError("Server error: " + err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1589820296154-3c34f1ffb51f')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <Card className="p-4 shadow-lg bg-white bg-opacity-75 rounded-4 border-0">
              <h2 className="text-center mb-4 text-success fw-bold">
                Create Account
              </h2>
              <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    name="name"
                    value={signupInfo.name}
                    onChange={handleChange}
                    className="border-success"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={signupInfo.email}
                    onChange={handleChange}
                    className="border-success"
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Create a strong password"
                    name="password"
                    value={signupInfo.password}
                    onChange={handleChange}
                    className="border-success"
                  />
                </Form.Group>

                <Button
                  variant="success"
                  type="submit"
                  className="w-100 fw-semibold"
                >
                  Sign Up
                </Button>

                <div className="mt-3 text-center">
                  Already registered?{" "}
                  <Link to="/login" className="text-success fw-semibold">
                    Login here
                  </Link>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
        <ToastContainer position="top-right" />
      </Container>
    </div>
  );
}

export default SignUpPage;
  