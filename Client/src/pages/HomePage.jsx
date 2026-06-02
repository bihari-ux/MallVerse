import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Row, Col, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useSEO from "../hooks/useSEO";

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [animate, setAnimate] = useState(false);

  useSEO({
    title: "MallVerse | The Ultimate Shopping Destination",
    description: "Shop premium electronics, fashion, groceries, and luxury watches. Enjoy lightning-fast delivery and secure checkout.",
    keywords: "ecommerce, shopping, premium products, mallverse, electronics, fashion",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "MallVerse",
      "url": "http://localhost:5173"
    }
  });

  useEffect(() => {
    setAnimate(true);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      const data = await res.json();
      // Fetch some premium products for the showcase
      setProducts((data.products || []).slice(0, 4));
    } catch (err) {
      console.error(err);
    }
  };

  const categories = [
    { name: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80", color: "#3b82f6", desc: "Smartphones & Gadgets" },
    { name: "Fashion", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80", color: "#ec4899", desc: "Men & Women Apparel" },
    { name: "Watches", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80", color: "#f59e0b", desc: "Luxury Timepieces" },
    { name: "Groceries", img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80", color: "#10b981", desc: "Fresh & Organic" }
  ];

  return (
    <div style={{ background: "#f8f9ff", overflowX: "hidden" }}>
      
      {/* ===== HERO SECTION ===== */}
      <div style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        padding: "80px 0"
      }}>
        {/* Abstract Glowing Orbs */}
        <div style={{ position: "absolute", top: "10%", right: "15%", width: "400px", height: "400px", borderRadius: "50%", background: "rgba(99, 102, 241, 0.25)", filter: "blur(60px)", animation: "float 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(236, 72, 153, 0.2)", filter: "blur(60px)", animation: "float 5s ease-in-out infinite reverse" }} />

        <Container style={{ zIndex: 2, position: "relative" }}>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <div style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.8s ease-out"
              }}>
                <div style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  background: "rgba(255,255,255,0.1)", 
                  backdropFilter: "blur(10px)", 
                  padding: "8px 20px", 
                  borderRadius: "50px", 
                  border: "1px solid rgba(255,255,255,0.2)", 
                  marginBottom: "25px" 
                }}>
                  <span style={{ color: "white", fontWeight: "600", letterSpacing: "1px", fontSize: "0.9rem" }}>WELCOME TO MALLVERSE 2.0</span>
                </div>

                <h1 style={{
                  fontSize: "clamp(3rem, 6vw, 4.5rem)",
                  fontWeight: "900",
                  color: "white",
                  lineHeight: "1.1",
                  marginBottom: "25px",
                  letterSpacing: "-1px"
                }}>
                  Elevate Your <br/>
                  <span style={{
                    background: "linear-gradient(90deg, #818cf8, #f472b6, #fbbf24)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>Shopping Experience</span>
                </h1>

                <p style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "1.2rem",
                  lineHeight: "1.6",
                  maxWidth: "500px",
                  marginBottom: "40px"
                }}>
                  Discover a world of premium electronics, luxury fashion, and daily essentials. Handpicked for quality, delivered with speed.
                </p>

                <div className="d-flex gap-4 flex-wrap">
                  <Button
                    onClick={() => navigate("/products")}
                    style={{
                      background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                      border: "none",
                      padding: "16px 40px",
                      borderRadius: "50px",
                      fontWeight: "700",
                      fontSize: "1.1rem",
                      boxShadow: "0 10px 30px rgba(236, 72, 153, 0.4)",
                      transition: "transform 0.3s"
                    }}
                    onMouseEnter={(e) => e.target.style.transform = "translateY(-5px)"}
                    onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
                  >
                    Explore Catalog
                  </Button>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div style={{
                position: "relative",
                opacity: animate ? 1 : 0,
                transform: animate ? "scale(1)" : "scale(0.9)",
                transition: "all 1s ease-out 0.3s"
              }}>
                {/* Main Hero Image */}
                <div style={{
                  position: "relative",
                  borderRadius: "30px",
                  overflow: "hidden",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
                  border: "2px solid rgba(255,255,255,0.1)",
                  transform: "rotate(3deg)",
                  animation: "float 6s ease-in-out infinite"
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
                    alt="Premium Fashion"
                    style={{ width: "100%", display: "block" }}
                  />
                  {/* Glass overlay text */}
                  <div style={{ position: "absolute", bottom: "30px", left: "30px", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)", padding: "15px 25px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <h4 style={{ color: "white", margin: 0, fontWeight: "800" }}>Summer Collection</h4>
                    <p style={{ color: "#fbbf24", margin: 0, fontWeight: "600" }}>Up to 50% Off</p>
                  </div>
                </div>

                {/* Floating Element 1 */}
                <div style={{
                  position: "absolute", top: "-30px", right: "-20px",
                  background: "white", padding: "15px", borderRadius: "20px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  animation: "float 4s ease-in-out infinite 1s",
                  display: "flex", alignItems: "center"
                }}>
                  <div>
                    <h6 style={{ margin: 0, fontWeight: "800", color: "#1e1b4b" }}>4.9/5 Rating</h6>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "#6b7280" }}>10k+ Reviews</p>
                  </div>
                </div>

                {/* Floating Element 2 */}
                <div style={{
                  position: "absolute", bottom: "40px", right: "-40px",
                  background: "white", padding: "15px", borderRadius: "20px",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  animation: "float 5s ease-in-out infinite 2s",
                  display: "flex", alignItems: "center"
                }}>
                  <div>
                    <h6 style={{ margin: 0, fontWeight: "800", color: "#1e1b4b" }}>Free Shipping</h6>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "#6b7280" }}>On all orders</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ===== PREMIUM CATEGORIES ===== */}
      <div style={{ padding: "100px 0", background: "white" }}>
        <Container>
          <div className="text-center mb-5">
            <span style={{ color: "#6366f1", fontWeight: "800", letterSpacing: "2px", textTransform: "uppercase" }}>Curated For You</span>
            <h2 style={{ fontWeight: "900", color: "#1e1b4b", fontSize: "3rem", marginTop: "10px" }}>
              Shop by Category
            </h2>
          </div>

          <Row className="g-4">
            {categories.map((cat, i) => (
              <Col xs={12} md={6} lg={3} key={i}>
                <div 
                  className="category-card"
                  onClick={() => navigate("/products")}
                  style={{
                    position: "relative",
                    height: "350px",
                    borderRadius: "24px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
                  }}
                >
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="category-img"
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s ease" }} 
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "30px",
                    transition: "all 0.3s"
                  }}>
                    <span style={{ color: cat.color, fontWeight: "700", fontSize: "0.9rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "5px" }}>
                      {cat.desc}
                    </span>
                    <h3 style={{ color: "white", fontWeight: "800", margin: 0, fontSize: "1.8rem" }}>
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* ===== AI RECOMMENDED SECTION ===== */}
      {products.length > 0 && (
        <div style={{ background: "#f8f9ff", padding: "100px 0" }}>
          <Container>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-end mb-5">
              <div>
                <div className="d-flex align-items-center mb-2">
                  <Badge bg="dark" style={{ background: "linear-gradient(90deg, #ec4899, #8b5cf6) !important", padding: "6px 12px", borderRadius: "20px" }}>Powered by AI</Badge>
                </div>
                <h2 style={{ fontWeight: "900", color: "#1e1b4b", fontSize: "2.5rem" }}>
                  Trending Now
                </h2>
              </div>
              <Button
                onClick={() => navigate("/products")}
                variant="link"
                style={{ color: "#6366f1", fontWeight: "700", textDecoration: "none", padding: 0 }}
              >
                View Complete Catalog →
              </Button>
            </div>

            <Row className="g-4">
              {products.map((prod) => (
                <Col xs={12} sm={6} lg={3} key={prod._id}>
                  <Card className="h-100 border-0 product-card" style={{ transition: "all 0.3s ease", borderRadius: "24px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      {prod.imageUrl ? (
                        <Card.Img
                          variant="top"
                          src={prod.imageUrl}
                          alt={prod.name}
                          style={{ objectFit: "cover", height: "260px", transition: "transform 0.5s ease" }}
                          className="product-img"
                        />
                      ) : (
                        <div style={{ height: "260px", backgroundColor: "#f1f5f9" }} />
                      )}
                      <div style={{ position: "absolute", top: "15px", left: "15px", background: "white", padding: "5px 12px", borderRadius: "50px", fontWeight: "700", fontSize: "0.8rem", color: "#1e1b4b", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}>
                        ★ {prod.rating || 4.5}
                      </div>
                    </div>
                    
                    <Card.Body className="d-flex flex-column p-4">
                      <Card.Title style={{ fontWeight: "800", color: "#1e1b4b", fontSize: "1.2rem", marginBottom: "15px" }} className="text-truncate">
                        {prod.name}
                      </Card.Title>
                      
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span style={{ color: "#6366f1", fontWeight: "900", fontSize: "1.4rem" }}>₹{prod.price}</span>
                        <Button
                          className="rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                          style={{ width: "45px", height: "45px", background: "#1e1b4b", border: "none", transition: "transform 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                          onClick={() => navigate("/products")}
                        >
                          <span style={{ color: "white", fontSize: "20px" }}>+</span>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}

      {/* ===== WHY CHOOSE MALLVERSE (SPLIT SECTION) ===== */}
      <div style={{ background: "white", padding: "100px 0" }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <div style={{ position: "relative" }}>
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" 
                  alt="Customer Service" 
                  style={{ width: "100%", borderRadius: "30px", boxShadow: "0 20px 50px rgba(0,0,0,0.1)" }}
                />
                <div style={{ position: "absolute", bottom: "-30px", right: "-30px", background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", padding: "40px", borderRadius: "30px", color: "white", boxShadow: "0 20px 40px rgba(30,27,75,0.3)" }}>
                  <h3 style={{ fontWeight: "900", fontSize: "3rem", margin: 0 }}>99%</h3>
                  <p style={{ margin: 0, fontWeight: "600", fontSize: "1.1rem", opacity: 0.8 }}>Customer Satisfaction</p>
                </div>
              </div>
            </Col>
            <Col lg={5} className="offset-lg-1">
              <span style={{ color: "#ec4899", fontWeight: "800", letterSpacing: "2px", textTransform: "uppercase" }}>Our Promise</span>
              <h2 style={{ fontWeight: "900", color: "#1e1b4b", fontSize: "3rem", marginTop: "10px", marginBottom: "30px", lineHeight: 1.2 }}>
                We Deliver Quality & Trust
              </h2>
              <p style={{ color: "#6b7280", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "40px" }}>
                MallVerse isn't just an e-commerce platform; it's a lifestyle. We vet every product to ensure it meets our rigorous standards of quality. From secure checkouts to lightning-fast logistics, we prioritize you.
              </p>
              
              <div className="d-flex flex-column gap-4">
                {[
                  { title: "100% Secure Payments", desc: "Bank-grade encryption for all transactions." },
                  { title: "Same-Day Delivery", desc: "Available for premium members in select cities." },
                  { title: "Hassle-Free Returns", desc: "30-day money-back guarantee on all items." }
                ].map((feature, i) => (
                  <div key={i} className="d-flex align-items-center gap-4">
                    <div>
                      <h5 style={{ fontWeight: "700", color: "#1e1b4b", margin: "0 0 5px 0" }}>{feature.title}</h5>
                      <p style={{ color: "#6b7280", margin: 0 }}>{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ===== NEWSLETTER CTA ===== */}
      <div style={{ padding: "80px 0" }}>
        <Container>
          <div style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)",
            borderRadius: "40px",
            padding: "80px 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 30px 60px rgba(30,27,75,0.2)"
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "url('https://www.transparenttextures.com/patterns/cubes.png')", opacity: 0.1 }} />
            
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ color: "white", fontWeight: "900", fontSize: "3.5rem", marginBottom: "20px" }}>
                Join the VIP Club
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.2rem", maxWidth: "600px", margin: "0 auto 40px" }}>
                Subscribe to our newsletter and get 15% off your first order, plus early access to sales and exclusive drops.
              </p>
              
              <div style={{ display: "flex", maxWidth: "500px", margin: "0 auto", background: "white", padding: "8px", borderRadius: "50px" }}>
                <input 
                  type="email" 
                  placeholder="Enter your email address..." 
                  style={{ flex: 1, border: "none", outline: "none", padding: "10px 20px", fontSize: "1rem", background: "transparent" }}
                />
                <Button style={{
                  background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                  border: "none",
                  borderRadius: "50px",
                  padding: "12px 30px",
                  fontWeight: "700"
                }}>
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-20px) rotate(0deg); }
        }
        
        .category-card:hover .category-img {
          transform: scale(1.1) !important;
        }
        
        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
        }
        .product-card:hover .product-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default HomePage;
