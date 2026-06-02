import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import useSEO from "../hooks/useSEO";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useSEO({
    title: "About MallVerse",
    description: "Learn about MallVerse, your ultimate e-commerce destination for premium products, electronics, fashion, and more. Discover our story and core values.",
    keywords: "about mallverse, mallverse story, premium ecommerce, online shopping, mallverse values",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About MallVerse",
      "description": "MallVerse is the leading online destination for premium products.",
      "url": "http://localhost:5173/about"
    }
  });

  useEffect(() => {
    setAnimate(true);
  }, []);

  const values = [
    { icon: "🛍️", title: "Quality First", desc: "We handpick every product to ensure you receive only the highest quality items." },
    { icon: "🤝", title: "Customer Obsession", desc: "Your satisfaction is our priority. We offer 24/7 support to guarantee a perfect experience." },
    { icon: "⚡", title: "Fast & Secure", desc: "Experience lightning-fast delivery and military-grade encryption for all your payments." },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "10K+", label: "Premium Products" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Customer Support" }
  ];

  return (
    <div style={{ background: "#f8f9ff", minHeight: "100vh" }}>
      {/* ===== HERO SECTION ===== */}
      <div style={{
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        padding: "120px 0 100px",
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decorative background elements */}
        <div style={{
          position: "absolute", top: "-50px", left: "10%",
          width: "250px", height: "250px", borderRadius: "50%",
          background: "rgba(99, 102, 241, 0.2)",
          filter: "blur(40px)",
          animation: "float 4s ease-in-out infinite"
        }} />
        <div style={{
          position: "absolute", bottom: "-50px", right: "10%",
          width: "350px", height: "350px", borderRadius: "50%",
          background: "rgba(236, 72, 153, 0.15)",
          filter: "blur(50px)",
          animation: "float 5s ease-in-out infinite reverse"
        }} />

        <Container style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s ease-out"
          }}>
            <span style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              color: "white",
              padding: "8px 24px",
              borderRadius: "30px",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "25px",
              letterSpacing: "1px",
              border: "1px solid rgba(255,255,255,0.2)"
            }}>
              DISCOVER OUR STORY
            </span>
            <h1 style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: "800",
              marginBottom: "20px",
              lineHeight: "1.2"
            }}>
              Redefining <span style={{
                background: "linear-gradient(90deg, #818cf8, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>E-Commerce</span>
            </h1>
            <p style={{
              fontSize: "1.2rem",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "750px",
              margin: "0 auto",
              lineHeight: "1.8"
            }}>
              MallVerse is not just a marketplace; it's your ultimate shopping destination. We bridge the gap between premium quality and unbeatable accessibility.
            </p>
          </div>
        </Container>
      </div>

      {/* ===== STATS BAR ===== */}
      <div style={{ 
        background: "white", 
        padding: "40px 0", 
        boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
        position: "relative",
        zIndex: 2,
        marginTop: "-30px",
        borderRadius: "20px",
        maxWidth: "90%",
        margin: "-40px auto 0 auto"
      }}>
        <Container>
          <Row className="text-center">
            {stats.map((stat, i) => (
              <Col xs={6} md={3} key={i} className="mb-3 mb-md-0">
                <h3 style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: "800", 
                  background: "linear-gradient(90deg, #6366f1, #ec4899)", 
                  WebkitBackgroundClip: "text", 
                  WebkitTextFillColor: "transparent",
                  marginBottom: "5px"
                }}>
                  {stat.number}
                </h3>
                <p style={{ color: "#6b7280", margin: 0, fontWeight: "600", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                  {stat.label}
                </p>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* ===== OUR STORY SECTION ===== */}
      <div style={{ padding: "100px 0" }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <div style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateX(0)" : "translateX(-50px)",
                transition: "all 0.8s ease-out 0.2s",
                position: "relative"
              }}>
                <div style={{
                  position: "absolute",
                  top: "-20px",
                  left: "-20px",
                  width: "100%",
                  height: "100%",
                  border: "4px solid #6366f1",
                  borderRadius: "24px",
                  zIndex: 0
                }} />
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                  alt="MallVerse Shopping Experience"
                  style={{
                    width: "100%",
                    borderRadius: "24px",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                    position: "relative",
                    zIndex: 1
                  }}
                />
              </div>
            </Col>
            <Col lg={6} className="ps-lg-5">
              <div style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateX(0)" : "translateX(50px)",
                transition: "all 0.8s ease-out 0.4s"
              }}>
                <span style={{
                  display: "inline-block",
                  color: "#ec4899",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontSize: "14px",
                  marginBottom: "10px",
                  background: "rgba(236, 72, 153, 0.1)",
                  padding: "5px 15px",
                  borderRadius: "20px"
                }}>
                  Who We Are
                </span>
                <h2 style={{
                  fontWeight: "800",
                  color: "#1e1b4b",
                  fontSize: "3rem",
                  marginBottom: "25px",
                  lineHeight: "1.2"
                }}>
                  The Future of <span style={{ color: "#6366f1" }}>Retail</span>
                </h2>
                <p style={{ color: "#6b7280", fontSize: "1.15rem", lineHeight: "1.8", marginBottom: "20px" }}>
                  Founded in 2026, MallVerse was born out of a simple idea: shopping should be an experience, not a chore. We meticulously curate our catalog to bring you the finest electronics, the freshest groceries, and the most stylish apparel.
                </p>
                <p style={{ color: "#6b7280", fontSize: "1.15rem", lineHeight: "1.8", marginBottom: "30px" }}>
                  Our global supply chain and cutting-edge logistics ensure that whether you're ordering a new smartphone or your weekly groceries, it arrives at your door with unprecedented speed and care. Welcome to the new standard of online shopping.
                </p>
                
                <button 
                  onClick={() => navigate("/products")}
                  className="btn text-white fw-bold px-4 py-3 rounded-pill" 
                  style={{ 
                    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    boxShadow: "0 10px 20px rgba(99, 102, 241, 0.3)",
                    transition: "transform 0.3s"
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "translateY(-3px)"}
                  onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
                >
                  Explore Our Catalog
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ===== WHAT WE OFFER SECTION ===== */}
      <div style={{ padding: "100px 0", background: "#f1f5f9" }}>
        <Container>
          <div className="text-center mb-5" style={{
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease-out 0.4s"
          }}>
            <h2 style={{ fontWeight: "800", color: "#1e1b4b", fontSize: "3rem" }}>
              What We Offer
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1.2rem", maxWidth: "700px", margin: "10px auto 0" }}>
              From daily essentials to high-end luxury, we bring the world's best products directly to you.
            </p>
          </div>

          <Row className="g-4">
            {[
              { title: "Fresh Groceries & Food", img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=500&q=80", desc: "Farm-fresh organic produce, daily dairy essentials, and pantry staples delivered straight to your kitchen with maximum freshness guaranteed.", color: "#10b981" },
              { title: "Premium Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=500&q=80", desc: "The latest smartphones, laptops, smart TVs, and cutting-edge gadgets from the world's most trusted technology brands.", color: "#3b82f6" },
              { title: "Fashion & Clothes", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=500&q=80", desc: "Stay ahead of the trends with our massive collection of men's, women's, and kids' apparel for every season and occasion.", color: "#ec4899" },
              { title: "Designer Watches", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=500&q=80", desc: "Elevate your wrist game with our selection of classic analog timepieces and the latest fitness smartwatches.", color: "#f59e0b" },
              { title: "Footwear & Shoes", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80", desc: "Step out in comfort and style. From athletic running sneakers to formal leather loafers, we have your feet covered.", color: "#ef4444" },
              { title: "Luxury Perfumes", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80", desc: "Discover your signature scent with our authentic collection of luxury colognes, perfumes, and body sprays.", color: "#8b5cf6" }
            ].map((cat, i) => (
              <Col lg={4} md={6} key={i}>
                <div style={{
                  opacity: animate ? 1 : 0,
                  transform: animate ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.8s ease-out ${0.4 + i * 0.1}s`,
                  height: "100%"
                }}>
                  <Card
                    className="h-100 border-0"
                    style={{
                      borderRadius: "20px",
                      padding: "30px",
                      background: "white",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                      transition: "all 0.3s ease",
                      borderTop: `5px solid ${cat.color}`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow = `0 15px 40px ${cat.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
                    }}
                  >
                    <div style={{
                      width: "100%",
                      height: "200px",
                      marginBottom: "20px",
                      borderRadius: "16px",
                      overflow: "hidden"
                    }}>
                      <img 
                        src={cat.img} 
                        alt={cat.title} 
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                      />
                    </div>
                    <h4 style={{ fontWeight: "700", color: "#1e1b4b", marginBottom: "15px" }}>
                      {cat.title}
                    </h4>
                    <p style={{ color: "#6b7280", margin: 0, lineHeight: "1.6" }}>
                      {cat.desc}
                    </p>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* ===== CORE VALUES SECTION ===== */}
      <div style={{ padding: "100px 0", background: "white" }}>
        <Container>
          <div className="text-center mb-5" style={{
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease-out 0.6s"
          }}>
            <h2 style={{ fontWeight: "800", color: "#1e1b4b", fontSize: "3rem" }}>
              Our Core Values
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1.2rem", maxWidth: "600px", margin: "10px auto 0" }}>
              The principles that drive every decision we make at MallVerse.
            </p>
          </div>

          <Row className="g-4">
            {values.map((val, i) => (
              <Col lg={4} md={6} key={i}>
                <div style={{
                  opacity: animate ? 1 : 0,
                  transform: animate ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.8s ease-out ${0.6 + i * 0.2}s`,
                  height: "100%"
                }}>
                  <Card
                    className="h-100 border-0 text-center"
                    style={{
                      borderRadius: "24px",
                      padding: "50px 30px",
                      background: "#f8f9ff",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      cursor: "pointer",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.02)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-15px)";
                      e.currentTarget.style.boxShadow = "0 25px 50px rgba(99, 102, 241, 0.15)";
                      e.currentTarget.style.background = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.02)";
                      e.currentTarget.style.background = "#f8f9ff";
                    }}
                  >
                    <div style={{ 
                      fontSize: "60px", 
                      marginBottom: "25px",
                      display: "inline-block",
                      background: "white",
                      width: "100px",
                      height: "100px",
                      lineHeight: "100px",
                      borderRadius: "50%",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
                    }}>
                      {val.icon}
                    </div>
                    <h4 style={{ fontWeight: "800", color: "#1e1b4b", marginBottom: "15px", fontSize: "1.5rem" }}>
                      {val.title}
                    </h4>
                    <p style={{ color: "#6b7280", margin: 0, fontSize: "1.1rem", lineHeight: "1.7" }}>
                      {val.desc}
                    </p>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* ===== GLOBAL FOOTPRINT SECTION ===== */}
      <div style={{ 
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", 
        padding: "100px 0",
        color: "white",
        textAlign: "center"
      }}>
        <Container>
          <div style={{
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.8s ease-out 0.8s"
          }}>
            <h2 style={{ fontWeight: "800", fontSize: "3rem", marginBottom: "20px" }}>
              Join the MallVerse Family
            </h2>
            <p style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.8)", maxWidth: "700px", margin: "0 auto 40px", lineHeight: "1.8" }}>
              Experience the difference of shopping with a platform that truly cares about quality, speed, and customer satisfaction.
            </p>
            <button 
              onClick={() => navigate("/register")}
              className="btn bg-white text-primary fw-bold px-5 py-3 rounded-pill fs-5"
              style={{
                boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              Create Your Account
            </button>
          </div>
        </Container>
      </div>

      {/* ===== CSS ANIMATIONS ===== */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
