import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const ServicesPage = () => {
  const [animate, setAnimate] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredService, setHoveredService] = useState(null);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const services = [
    {
      title: "Fresh Groceries Delivery",
      description: "Get farm-fresh organic produce and daily essentials delivered directly to your doorstep.",
      img: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=500&q=80",
      color: "#10b981",
      details: "Organic, Fresh, Fast Delivery"
    },
    {
      title: "Premium Fashion & Clothing",
      description: "Stay ahead of the trends with our curated collection of men's and women's apparel.",
      img: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=500&q=80",
      color: "#ec4899",
      details: "Trending, Comfortable, Stylish"
    },
    {
      title: "Latest Electronics",
      description: "Upgrade your lifestyle with top-tier gadgets, smartphones, and smart home devices.",
      img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=500&q=80",
      color: "#3b82f6",
      details: "Laptops, Phones, Smart TVs"
    },
    {
      title: "Luxury Perfumes",
      description: "Discover signature scents and premium fragrances for every occasion.",
      img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80",
      color: "#8b5cf6",
      details: "Colognes, Parfums, Body Sprays"
    },
    {
      title: "Designer Watches",
      description: "Elevate your style with classic analog and modern smart watches from top brands.",
      img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=500&q=80",
      color: "#f59e0b",
      details: "Analog, Digital, Smart Watches"
    },
    {
      title: "Premium Footwear",
      description: "Step out in comfort and style with our extensive collection of shoes and sneakers.",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
      color: "#ef4444",
      details: "Sneakers, Loafers, Formal"
    },
    {
      title: "Fast & Free Shipping",
      description: "Enjoy lightning-fast delivery on all your orders, with free shipping on eligible items.",
      img: "https://images.unsplash.com/photo-1617502424169-2f22b7dc0bf3?auto=format&fit=crop&w=500&q=80",
      color: "#06b6d4",
      details: "Same-Day, Next-Day Delivery"
    },
    {
      title: "Secure Payment Processing",
      description: "Shop with confidence knowing your transactions are protected by industry-leading security.",
      img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=500&q=80",
      color: "#14b8a6",
      details: "Cards, UPI, COD Accepted"
    },
    {
      title: "24/7 Customer Support",
      description: "Our dedicated support team is always available to assist you with your queries.",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=80",
      color: "#6366f1",
      details: "Live Chat, Email, Phone"
    }
  ];

  const process = [
    { step: 1, title: "Browse & Discover", description: "Explore our vast catalog of premium products across multiple categories." },
    { step: 2, title: "Add to Cart", description: "Select your favorite items and easily add them to your shopping cart." },
    { step: 3, title: "Secure Checkout", description: "Complete your purchase using our highly secure and encrypted payment gateways." },
    { step: 4, title: "Order Processing", description: "We immediately process and carefully pack your order for safe transit." },
    { step: 5, title: "Fast Shipping", description: "Your package is handed over to our trusted delivery partners for rapid shipping." },
    { step: 6, title: "Happy Unboxing", description: "Receive your items at your doorstep and enjoy a premium unboxing experience." }
  ];

  const testimonials = [
    {
      name: "John Anderson",
      company: "Verified Buyer",
      text: "MallVerse transformed the way I shop. Their electronics collection is top-notch and delivery was incredibly fast!",
      rating: 5,
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Sarah Johnson",
      company: "Verified Buyer",
      text: "I buy all my groceries from here now. The produce is always fresh, and the prices are unbeatable.",
      rating: 5,
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Mike Chen",
      company: "Verified Buyer",
      text: "Outstanding customer support! I had an issue with a watch I ordered and they replaced it the next day.",
      rating: 5,
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Emily Davis",
      company: "Verified Buyer",
      text: "The clothing collection is amazing. The quality is far better than what I expected for the price.",
      rating: 5,
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "David Smith",
      company: "Verified Buyer",
      text: "Fastest shipping I have ever experienced. My new sneakers arrived in less than 24 hours. Highly recommend!",
      rating: 5,
      img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Jessica Taylor",
      company: "Verified Buyer",
      text: "Their perfume selection is authentic and reasonably priced. I'm definitely going to be a returning customer.",
      rating: 5,
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "200+", label: "Happy Clients" },
    { number: "50+", label: "Team Members" },
    { number: "99.9%", label: "Uptime Guarantee" }
  ];

  const features = [
    { icon: "⚡", title: "Lightning Fast Delivery", desc: "Get your orders delivered in record time." },
    { icon: "🔒", title: "100% Secure Payments", desc: "Your financial data is always encrypted and safe." },
    { icon: "🛍️", title: "Premium Quality", desc: "We source only the highest quality products." },
    { icon: "💰", title: "Best Prices", desc: "Enjoy unbeatable prices and regular discounts." },
    { icon: "🔄", title: "Easy Returns", desc: "Hassle-free 30-day return policy on most items." },
    { icon: "🎯", title: "Personalized Shopping", desc: "Smart recommendations tailored just for you." }
  ];

  return (
    <div style={{ background: "#f8f9ff", minHeight: "100vh" }}>
      {/* ===== HERO SECTION ===== */}
      <div style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
        padding: "100px 0 80px",
        color: "white",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: "20%", left: "5%",
          width: "150px", height: "150px", borderRadius: "50%",
          background: "rgba(99, 102, 241, 0.2)",
          filter: "blur(30px)",
          animation: "float 4s ease-in-out infinite"
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "10%",
          width: "250px", height: "250px", borderRadius: "50%",
          background: "rgba(236, 72, 153, 0.15)",
          filter: "blur(40px)",
          animation: "float 5s ease-in-out infinite reverse"
        }} />

        <Container style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease-out"
          }}>
            <h1 style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: "800",
              marginBottom: "20px"
            }}>
              Why Choose <span style={{
                background: "linear-gradient(90deg, #818cf8, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>MallVerse?</span>
            </h1>
            <p style={{
              fontSize: "1.2rem",
              color: "rgba(255,255,255,0.8)",
              maxWidth: "700px",
              margin: "0 auto 30px",
              lineHeight: "1.6"
            }}>
              We offer a world-class shopping experience with a vast selection of premium products across multiple categories.
            </p>
            <Button style={{
              background: "linear-gradient(90deg, #818cf8, #6366f1)",
              border: "none",
              padding: "12px 40px",
              fontSize: "1.1rem",
              fontWeight: "600",
              borderRadius: "50px",
              transition: "all 0.3s"
            }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              Get Started Now
            </Button>
          </div>
        </Container>
      </div>

      {/* ===== SERVICES GRID ===== */}
      <div style={{ padding: "80px 0" }}>
        <Container>
          <div className="text-center mb-5" style={{
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out 0.2s"
          }}>
            <h2 style={{ fontWeight: "800", color: "#1e1b4b", fontSize: "2.5rem" }}>
              Our Premium Categories
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1.1rem", maxWidth: "600px", margin: "10px auto 0" }}>
              Explore the best products tailored just for you.
            </p>
          </div>

          <Row className="g-4">
            {services.map((service, i) => (
              <Col md={6} lg={4} key={i}>
                <div style={{
                  opacity: animate ? 1 : 0,
                  transform: animate ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.8s ease-out ${0.2 + i * 0.15}s`,
                  height: "100%"
                }}>
                  <Card
                    className="h-100 border-0"
                    style={{
                      borderRadius: "20px",
                      padding: "30px",
                      background: "white",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-12px)";
                      e.currentTarget.style.boxShadow = `0 20px 40px ${service.color}25`;
                      setHoveredService(i);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
                      setHoveredService(null);
                    }}
                  >
                    {/* Top color bar */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0,
                      height: "6px", background: service.color
                    }} />

                    <div style={{
                      width: "100%",
                      height: "180px",
                      marginBottom: "20px",
                      borderRadius: "15px",
                      overflow: "hidden"
                    }}>
                      <img 
                        src={service.img} 
                        alt={service.title} 
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                      />
                    </div>
                    
                    <h4 style={{ fontWeight: "700", color: "#1e1b4b", marginBottom: "15px" }}>
                      {service.title}
                    </h4>
                    <p style={{ color: "#6b7280", margin: "0 0 15px 0", lineHeight: "1.7" }}>
                      {service.description}
                    </p>
                    {hoveredService === i && (
                      <p style={{ color: service.color, fontSize: "0.9rem", fontWeight: "600", margin: 0 }}>
                        {service.details}
                      </p>
                    )}
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* ===== OUR PROCESS SECTION ===== */}
      <div style={{ background: "linear-gradient(135deg, rgba(30, 27, 75, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)", padding: "80px 0" }}>
        <Container>
          <div className="text-center mb-5" style={{
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out 0.2s"
          }}>
            <h2 style={{ fontWeight: "800", color: "#1e1b4b", fontSize: "2.5rem" }}>
              How To Shop
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1.1rem", maxWidth: "600px", margin: "10px auto 0" }}>
              A seamless and secure shopping experience from start to finish.
            </p>
          </div>

          <Row className="g-4">
            {process.map((item, i) => (
              <Col md={6} lg={4} key={i}>
                <div style={{
                  opacity: animate ? 1 : 0,
                  transform: animate ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.8s ease-out ${0.2 + i * 0.1}s`,
                  cursor: "pointer",
                  padding: "30px",
                  background: activeStep === i ? "white" : "transparent",
                  borderRadius: "15px",
                  boxShadow: activeStep === i ? "0 10px 30px rgba(0,0,0,0.08)" : "none"
                }}
                  onMouseEnter={() => setActiveStep(i)}
                >
                  <div style={{
                    width: "60px",
                    height: "60px",
                    background: activeStep === i ? "linear-gradient(135deg, #6366f1, #ec4899)" : "rgba(99, 102, 241, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    fontWeight: "800",
                    color: activeStep === i ? "white" : "#6366f1",
                    marginBottom: "20px",
                    transition: "all 0.3s"
                  }}>
                    {item.step}
                  </div>
                  <h4 style={{ fontWeight: "700", color: "#1e1b4b", marginBottom: "10px" }}>
                    {item.title}
                  </h4>
                  <p style={{ color: "#6b7280", margin: 0, lineHeight: "1.6" }}>
                    {item.description}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* ===== TESTIMONIALS SLIDER ===== */}
      <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", padding: "80px 0", color: "white", overflow: "hidden" }}>
        <Container>
          <div className="text-center mb-5" style={{
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out 0.2s"
          }}>
            <h2 style={{ fontWeight: "800", fontSize: "2.5rem" }}>
              What Our Clients Say
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", maxWidth: "600px", margin: "10px auto 0" }}>
              Real experiences from real customers who love shopping with MallVerse.
            </p>
          </div>
        </Container>

        {/* Sliding Marquee Container */}
        <div style={{ width: "100%", overflow: "hidden", whiteSpace: "nowrap", padding: "20px 0" }}>
          <div style={{
            display: "inline-flex",
            gap: "30px",
            animation: "marquee 40s linear infinite",
            paddingLeft: "30px"
          }}>
            {/* Duplicate array for seamless infinite scroll */}
            {[...testimonials, ...testimonials].map((testimonial, i) => (
              <div key={i} style={{ width: "400px", flexShrink: 0, whiteSpace: "normal" }}>
                <Card
                  className="h-100 border-0"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    padding: "30px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s"
                  }}
                >
                  <div style={{ marginBottom: "20px" }}>
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <span key={idx} style={{ fontSize: "20px", color: "#fbbf24" }}>⭐</span>
                    ))}
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.9)", lineHeight: "1.7", marginBottom: "20px", minHeight: "80px" }}>
                    "{testimonial.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <img 
                      src={testimonial.img} 
                      alt={testimonial.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid rgba(255,255,255,0.3)"
                      }} 
                    />
                    <div>
                      <p style={{ margin: "0", fontWeight: "700", color: "white" }}>
                        {testimonial.name}
                      </p>
                      <p style={{ margin: "0", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== WHY CHOOSE US ===== */}
      <div style={{ padding: "80px 0" }}>
        <Container>
          <div className="text-center mb-5" style={{
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out 0.2s"
          }}>
            <h2 style={{ fontWeight: "800", color: "#1e1b4b", fontSize: "2.5rem" }}>
              Why Choose Us?
            </h2>
            <p style={{ color: "#6b7280", fontSize: "1.1rem", maxWidth: "600px", margin: "10px auto 0" }}>
              Industry-leading practices and commitment to excellence.
            </p>
          </div>

          <Row className="g-4">
            {features.map((feature, i) => (
              <Col md={6} lg={4} key={i}>
                <div style={{
                  opacity: animate ? 1 : 0,
                  transform: animate ? "translateY(0)" : "translateY(40px)",
                  transition: `all 0.8s ease-out ${0.2 + i * 0.1}s`,
                  textAlign: "center",
                  padding: "30px",
                  borderRadius: "15px",
                  background: "white",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.03)",
                  cursor: "pointer"
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 15px 40px rgba(99, 102, 241, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.03)";
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "15px" }}>
                    {feature.icon}
                  </div>
                  <h4 style={{ fontWeight: "700", color: "#1e1b4b", marginBottom: "10px" }}>
                    {feature.title}
                  </h4>
                  <p style={{ color: "#6b7280", margin: 0, fontSize: "0.95rem" }}>
                    {feature.desc}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* ===== CTA SECTION ===== */}
      <div style={{ background: "#f8f9ff", padding: "80px 0" }}>
        <Container>
          <div style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
            padding: "60px",
            borderRadius: "30px",
            textAlign: "center",
            color: "white",
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease-out 0.4s"
          }}>
            <h2 style={{ fontWeight: "800", fontSize: "2.5rem", marginBottom: "15px" }}>
              Ready to Start Shopping?
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.9)", marginBottom: "30px", maxWidth: "600px", margin: "0 auto 30px" }}>
              Join thousands of happy customers today and discover amazing deals.
            </p>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
              <Button style={{
                background: "linear-gradient(90deg, #818cf8, #6366f1)",
                border: "none",
                padding: "14px 45px",
                fontSize: "1rem",
                fontWeight: "600",
                borderRadius: "50px",
                transition: "all 0.3s",
                cursor: "pointer"
              }}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
              >
                Shop Now
              </Button>
              <Button style={{
                background: "transparent",
                border: "2px solid white",
                color: "white",
                padding: "12px 45px",
                fontSize: "1rem",
                fontWeight: "600",
                borderRadius: "50px",
                transition: "all 0.3s",
                cursor: "pointer"
              }}
                onClick={() => window.location.href = '/register'}
                onMouseEnter={(e) => {
                  e.target.style.background = "white";
                  e.target.style.color = "#1e1b4b";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "white";
                }}
              >
                Create Account
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* ===== CSS ANIMATIONS ===== */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          h1 { font-size: 2rem !important; }
          h2 { font-size: 1.8rem !important; }
          .card { margin-bottom: 20px; }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;
