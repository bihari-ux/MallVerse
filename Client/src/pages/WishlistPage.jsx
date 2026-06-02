import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Row, Col, Button, Badge } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import "react-toastify/dist/ReactToastify.css";

const WISHLIST_URL = `${import.meta.env.VITE_API_URL}/api/wishlist`;
const CART_URL = `${import.meta.env.VITE_API_URL}/api/cart`;

function WishlistPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  useSEO({
    title: "Your Wishlist | MallVerse",
    description: "View and manage your favorite premium products in your MallVerse wishlist.",
  });

  const fetchWishlist = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`${WISHLIST_URL}/${user.id}`);
      const data = await res.json();
      setWishlistItems(data.products || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch wishlist");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/logIn");
      return;
    }
    fetchWishlist();
  }, [isLoggedIn, user]);

  const removeFromWishlist = async (productId) => {
    try {
      const res = await fetch(`${WISHLIST_URL}/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId }),
      });
      const data = await res.json();
      setWishlistItems(data.products || []);
      toast.success("Removed from wishlist");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove");
    }
  };

  const moveToCart = async (productId) => {
    try {
      const res = await fetch(`${CART_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId }),
      });
      if (!res.ok) throw new Error("Failed");
      // Remove from wishlist after adding to cart
      await fetch(`${WISHLIST_URL}/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId }),
      });
      fetchWishlist();
      toast.success("Moved to cart! 🛒");
    } catch (err) {
      console.error(err);
      toast.error("Failed to move to cart");
    }
  };

  return (
    <div style={{ background: "#f8f9ff", minHeight: "100vh", padding: "60px 0" }}>
      <Container>
        <div className="mb-5 text-center">
          <h2 style={{ fontWeight: "800", color: "#1e1b4b", fontSize: "2.5rem" }}>
            Your <span style={{ background: "linear-gradient(90deg, #ec4899, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Wishlist</span>
          </h2>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>Save your favorite items and buy them later</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center p-5" style={{ background: "white", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: "80px", marginBottom: "20px" }}>💖</div>
            <h3 style={{ fontWeight: "700", color: "#1e1b4b", marginBottom: "15px" }}>Your wishlist is empty</h3>
            <p className="text-muted mb-4 fs-5">You haven't added any items to your wishlist yet.</p>
            <Button 
              onClick={() => navigate("/products")}
              style={{
                background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                border: "none",
                padding: "12px 30px",
                borderRadius: "50px",
                fontWeight: "600",
                boxShadow: "0 10px 20px rgba(236, 72, 153, 0.2)"
              }}
            >
              Discover Products
            </Button>
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {wishlistItems.map((item) => {
              const product = item.productId;
              if (!product) return null;
              return (
                <Col key={product._id}>
                  <Card className="h-100 border-0 wishlist-card" style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.04)", transition: "all 0.3s" }}>
                    <div style={{ position: "relative" }}>
                      {product.imageUrl ? (
                        <Card.Img
                          variant="top"
                          src={product.imageUrl}
                          alt={product.name}
                          style={{ objectFit: "cover", height: "220px", transition: "transform 0.5s ease" }}
                          className="wishlist-img"
                        />
                      ) : (
                        <div style={{ height: "220px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: "40px" }}>📦</span>
                        </div>
                      )}
                      <Button
                        variant="light"
                        className="rounded-circle shadow-sm"
                        style={{ position: "absolute", top: "10px", right: "10px", width: "35px", height: "35px", padding: 0, zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444" }}
                        onClick={() => removeFromWishlist(product._id)}
                      >
                        ✕
                      </Button>
                    </div>
                    <Card.Body className="d-flex flex-column p-4">
                      <Card.Title style={{ fontWeight: "700", color: "#1e1b4b", fontSize: "1.1rem", marginBottom: "10px" }} className="text-truncate">
                        {product.name}
                      </Card.Title>
                      
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span style={{ color: "#6366f1", fontWeight: "800", fontSize: "1.2rem" }}>₹{product.price}</span>
                      </div>
                      
                      <Card.Text className="text-muted flex-grow-1" style={{ fontSize: "0.9rem", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {product.description}
                      </Card.Text>
                      
                      <Button
                        style={{
                          background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                          border: "none",
                          borderRadius: "50px",
                          fontWeight: "600",
                          padding: "10px",
                          marginTop: "15px"
                        }}
                        className="w-100"
                        onClick={() => moveToCart(product._id)}
                      >
                        Move to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}

        <ToastContainer position="top-right" autoClose={2500} theme="colored" />
        <style>{`
          .wishlist-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.1) !important;
          }
          .wishlist-card:hover .wishlist-img {
            transform: scale(1.05);
          }
        `}</style>
      </Container>
    </div>
  );
}

export default WishlistPage;
