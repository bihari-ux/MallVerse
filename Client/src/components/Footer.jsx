import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ background: "#0f0c29", color: "white", paddingTop: "50px", paddingBottom: "20px", marginTop: "auto" }}>
      <Container>
        <Row className="gy-4">
          <Col lg={4} md={6}>
            <h4 style={{ fontWeight: "800", background: "linear-gradient(90deg, #6366f1, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "20px" }}>
              MallVerse
            </h4>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.6" }}>
              Your ultimate shopping destination. Discover amazing products at unbeatable prices with our secure and fast platform.
            </p>
          </Col>
          
          <Col lg={2} md={6}>
            <h5 style={{ fontWeight: "700", marginBottom: "20px" }}>Quick Links</h5>
            <ul className="list-unstyled" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <li><Link to="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.3s" }}>Home</Link></li>
              <li><Link to="/products" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.3s" }}>Products</Link></li>
              <li><Link to="/about" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.3s" }}>About Us</Link></li>
              <li><Link to="/services" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color 0.3s" }}>Services</Link></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h5 style={{ fontWeight: "700", marginBottom: "20px" }}>Customer Support</h5>
            <ul className="list-unstyled" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <li><span style={{ color: "rgba(255,255,255,0.7)" }}>FAQ</span></li>
              <li><span style={{ color: "rgba(255,255,255,0.7)" }}>Shipping Policy</span></li>
              <li><span style={{ color: "rgba(255,255,255,0.7)" }}>Returns & Refunds</span></li>
              <li><span style={{ color: "rgba(255,255,255,0.7)" }}>Contact Us</span></li>
            </ul>
          </Col>

          <Col lg={3} md={6}>
            <h5 style={{ fontWeight: "700", marginBottom: "20px" }}>Newsletter</h5>
            <p style={{ color: "rgba(255,255,255,0.7)" }}>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <div className="d-flex mt-3">
              <input type="email" placeholder="Enter your email" className="form-control" style={{ borderRadius: "8px 0 0 8px", border: "none" }} />
              <button className="btn" style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)", color: "white", borderRadius: "0 8px 8px 0", border: "none" }}>Subscribe</button>
            </div>
          </Col>
        </Row>
        
        <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "40px 0 20px" }} />
        
        <div className="text-center">
          <p style={{ color: "rgba(255,255,255,0.5)", margin: 0, fontSize: "14px" }}>
            &copy; {new Date().getFullYear()} MallVerse. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
