import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Badge } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import "react-toastify/dist/ReactToastify.css";

const CART_URL = "http://localhost:5000/api/cart";

function CartPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useSEO({
    title: "Your Shopping Cart | MallVerse",
    description: "Review your selected premium items in your MallVerse shopping cart before securely checking out.",
  });

  const fetchCart = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`${CART_URL}/${user.id}`);
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch cart");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/logIn");
      return;
    }
    fetchCart();
  }, [isLoggedIn, user]);

  const updateQty = async (productId, quantity) => {
    try {
      const res = await fetch(`${CART_URL}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId, quantity }),
      });
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await fetch(`${CART_URL}/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId }),
      });
      const data = await res.json();
      setCartItems(data.items || []);
      toast.success("Item removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.productId?.price || 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div style={{ background: "#f8f9ff", minHeight: "100vh", padding: "60px 0" }}>
      <Container>
        <div className="mb-5 text-center">
          <h2 style={{ fontWeight: "800", color: "#1e1b4b", fontSize: "2.5rem" }}>
            Your <span style={{ background: "linear-gradient(90deg, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Cart</span>
          </h2>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>Review your items before proceeding to checkout</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center p-5" style={{ background: "white", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: "80px", marginBottom: "20px" }}>🛒</div>
            <h3 style={{ fontWeight: "700", color: "#1e1b4b", marginBottom: "15px" }}>Your cart is empty</h3>
            <p className="text-muted mb-4 fs-5">Looks like you haven't added any premium items yet.</p>
            <Button 
              onClick={() => navigate("/products")}
              style={{
                background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                border: "none",
                padding: "12px 30px",
                borderRadius: "50px",
                fontWeight: "600",
                boxShadow: "0 10px 20px rgba(99, 102, 241, 0.2)"
              }}
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <Row>
            {/* Cart Items List */}
            <Col lg={8} className="mb-4">
              <div style={{ background: "white", borderRadius: "24px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
                {cartItems.map((item, index) => {
                  const product = item.productId;
                  if (!product) return null;
                  return (
                    <div key={product._id} className="d-flex align-items-center py-3" style={{ borderBottom: index !== cartItems.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                      <div style={{ width: "100px", height: "100px", borderRadius: "12px", overflow: "hidden", flexShrink: 0 }}>
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <div style={{ width: "100%", height: "100%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "24px" }}>📦</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="ms-4 flex-grow-1">
                        <h5 style={{ fontWeight: "700", color: "#1e1b4b", marginBottom: "5px" }}>{product.name}</h5>
                        <p style={{ color: "#6366f1", fontWeight: "700", fontSize: "1.2rem", marginBottom: "10px" }}>₹{product.price}</p>
                        
                        <div className="d-flex align-items-center gap-3">
                          <div className="d-flex align-items-center" style={{ background: "#f8f9ff", borderRadius: "50px", padding: "5px 10px" }}>
                            <Button
                              variant="link"
                              className="p-0 text-decoration-none text-dark"
                              style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}
                              onClick={() => updateQty(product._id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <span className="fw-bold mx-3">{item.quantity}</span>
                            <Button
                              variant="link"
                              className="p-0 text-decoration-none text-dark"
                              style={{ width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}
                              onClick={() => updateQty(product._id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                          
                          <Button
                            variant="link"
                            className="text-danger p-0 text-decoration-none fw-semibold"
                            onClick={() => removeItem(product._id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-end ms-3 d-none d-md-block">
                        <p className="text-muted small mb-1">Subtotal</p>
                        <h5 style={{ fontWeight: "800", color: "#1e1b4b" }}>₹{(product.price * item.quantity).toFixed(2)}</h5>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Col>
            
            {/* Order Summary */}
            <Col lg={4}>
              <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)", borderRadius: "24px", padding: "30px", color: "white", position: "sticky", top: "100px" }}>
                <h4 style={{ fontWeight: "800", marginBottom: "25px" }}>Order Summary</h4>
                
                <div className="d-flex justify-content-between mb-3">
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>Subtotal ({cartItems.length} items)</span>
                  <span className="fw-bold">₹{totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-3">
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>Shipping</span>
                  <span className="text-success fw-bold">Free</span>
                </div>
                
                <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "20px 0" }} />
                
                <div className="d-flex justify-content-between mb-4">
                  <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>Total</span>
                  <span style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fbbf24" }}>₹{totalPrice.toFixed(2)}</span>
                </div>
                
                <Button
                  className="w-100 py-3"
                  style={{
                    background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                    border: "none",
                    borderRadius: "50px",
                    fontWeight: "700",
                    fontSize: "1.1rem",
                    boxShadow: "0 10px 20px rgba(236, 72, 153, 0.3)",
                    transition: "transform 0.3s"
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.02)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
                
                <div className="text-center mt-3">
                  <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)" }}>
                    🔒 Secure Encrypted Checkout
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </div>
  );
}

export default CartPage;
