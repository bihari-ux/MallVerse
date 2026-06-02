import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Card, Row, Col, Badge, Form, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import useSEO from "../hooks/useSEO";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api/products";
const CART_URL = "http://localhost:5000/api/cart";
const WISHLIST_URL = "http://localhost:5000/api/wishlist";
const CATEGORIES_URL = "http://localhost:5000/api/categories";

function ProductPage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  
  // Filter States
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("");

  useSEO({
    title: "Shop Premium Products | MallVerse",
    description: "Browse MallVerse's premium collection of electronics, fashion, groceries, and more. Find the best deals today.",
    keywords: "products, shopping, ecommerce, mallverse, premium",
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch(CATEGORIES_URL);
      const data = await res.json();
      setCategories(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      let queryUrl = `${API_URL}?sort=${sort}`;
      if (category) queryUrl += `&category=${category}`;
      if (minPrice) queryUrl += `&minPrice=${minPrice}`;
      if (maxPrice) queryUrl += `&maxPrice=${maxPrice}`;
      if (rating) queryUrl += `&rating=${rating}`;
      
      const res = await fetch(queryUrl);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Fetch failed");
      setAllProducts(data.products || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    if (!keyword.trim()) {
      setDisplayedProducts(allProducts);
    } else {
      const lowerKeyword = keyword.toLowerCase();
      const filtered = allProducts.filter((p) =>
        p.name.toLowerCase().includes(lowerKeyword)
      );
      setDisplayedProducts(filtered);
    }
  }, [allProducts, keyword]);

  const fetchWishlist = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`${WISHLIST_URL}/${user.id}`);
      const data = await res.json();
      const ids = (data.products || []).map((p) => p.productId?._id || p.productId);
      setWishlistIds(ids);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [sort, category, minPrice, maxPrice, rating]);

  useEffect(() => {
    if (isLoggedIn && user?.id) fetchWishlist();
  }, [isLoggedIn, user]);

  const handleAddToCart = async (productId) => {
    if (!isLoggedIn || !user) {
      toast.warning("Please login first!");
      return;
    }
    const userId = user.id || user._id;
    if (!userId) {
      toast.error("Session error. Please logout and login again.");
      return;
    }
    try {
      const res = await fetch(`${CART_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add to cart");
      toast.success("Added to cart! ");
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error(err.message || "Failed to add to cart");
    }
  };

  const handleToggleWishlist = async (productId) => {
    if (!isLoggedIn || !user) {
      toast.warning("Please login first!");
      return;
    }
    const userId = user.id || user._id;
    const isInWishlist = wishlistIds.includes(productId);
    try {
      const url = isInWishlist ? `${WISHLIST_URL}/remove` : `${WISHLIST_URL}/add`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      if (!res.ok) throw new Error("Failed");
      if (isInWishlist) {
        setWishlistIds((prev) => prev.filter((id) => id !== productId));
        toast.info("Removed from wishlist");
      } else {
        setWishlistIds((prev) => [...prev, productId]);
        toast.success("Added to wishlist! ♥");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update wishlist");
    }
  };
  
  const handleClearFilters = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setRating("");
    setSort("");
    setKeyword("");
  };

  return (
    <div style={{ background: "#f8f9ff", minHeight: "100vh", padding: "40px 0" }}>
      <Container>
        <div className="mb-5 text-center">
          <h2 style={{ fontWeight: "800", color: "#1e1b4b", fontSize: "2.5rem" }}>
            Explore <span style={{ background: "linear-gradient(90deg, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Collection</span>
          </h2>
          <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>Find the best products tailored just for you</p>
        </div>

        <Row>
          {/* Filters Sidebar */}
          <Col lg={3} md={4} className="mb-4">
            <Card className="border-0 sticky-top" style={{ top: '100px', zIndex: 1, borderRadius: "20px", padding: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <Card.Body>
                <h5 style={{ fontWeight: "700", color: "#1e1b4b", marginBottom: "20px" }}>Filters</h5>
                
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: "600", fontSize: "0.9rem", color: "#6b7280" }}>Category</Form.Label>
                  <Form.Select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ borderRadius: "10px", border: "1px solid #e2e8f0", padding: "10px", boxShadow: "none" }}
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: "600", fontSize: "0.9rem", color: "#6b7280" }}>Price Range</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Control 
                      type="number" 
                      placeholder="Min" 
                      value={minPrice} 
                      onChange={(e) => setMinPrice(e.target.value)} 
                      style={{ borderRadius: "10px", border: "1px solid #e2e8f0" }}
                    />
                    <Form.Control 
                      type="number" 
                      placeholder="Max" 
                      value={maxPrice} 
                      onChange={(e) => setMaxPrice(e.target.value)} 
                      style={{ borderRadius: "10px", border: "1px solid #e2e8f0" }}
                    />
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: "600", fontSize: "0.9rem", color: "#6b7280" }}>Minimum Rating</Form.Label>
                  <Form.Select 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)}
                    style={{ borderRadius: "10px", border: "1px solid #e2e8f0", padding: "10px" }}
                  >
                    <option value="">Any Rating</option>
                    <option value="4">4 Stars & Up</option>
                    <option value="3">3 Stars & Up</option>
                    <option value="2">2 Stars & Up</option>
                    <option value="1">1 Star & Up</option>
                  </Form.Select>
                </Form.Group>
                
                <Button 
                  className="w-100" 
                  style={{
                    background: "transparent",
                    color: "#6366f1",
                    border: "1px solid #6366f1",
                    borderRadius: "50px",
                    fontWeight: "600",
                    padding: "10px"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#6366f1";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "#6366f1";
                  }}
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Main Content Area */}
          <Col lg={9} md={8}>
            <div className="d-flex flex-column flex-md-row justify-content-end align-items-center mb-4 gap-3">
              <div className="d-flex gap-2 w-100 justify-content-md-end">
                <InputGroup style={{ maxWidth: "300px" }}>
                  <Form.Control
                    placeholder="Search products..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ borderRadius: "10px", border: "1px solid #e2e8f0" }}
                  />
                </InputGroup>
                
                <Form.Select 
                  style={{ width: "160px", borderRadius: "10px", border: "1px solid #e2e8f0" }} 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="lowest">Price: Low to High</option>
                  <option value="highest">Price: High to Low</option>
                  <option value="toprated">Top Rated</option>
                </Form.Select>
              </div>
            </div>

            <Row xs={1} sm={2} lg={3} className="g-4">
              {displayedProducts.length > 0 ? (
                displayedProducts.map((prod) => (
                  <Col key={prod._id}>
                    <Card className="h-100 border-0 product-card" style={{ transition: "all 0.3s ease", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
                      <div style={{ position: "relative", overflow: "hidden" }}>
                        {prod.imageUrl ? (
                          <Card.Img
                            variant="top"
                            src={prod.imageUrl}
                            alt={prod.name}
                            style={{ objectFit: "cover", height: "240px", transition: "transform 0.5s ease" }}
                            className="product-img"
                          />
                        ) : (
                          <div style={{ height: "240px", backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "40px" }}>📦</span>
                          </div>
                        )}
                        <Button
                          variant="light"
                          className="rounded-circle shadow-sm d-flex align-items-center justify-content-center"
                          style={{ position: "absolute", top: "15px", right: "15px", width: "40px", height: "40px", padding: 0, zIndex: 2, color: wishlistIds.includes(prod._id) ? "#ef4444" : "#9ca3af", transition: "all 0.2s" }}
                          onClick={() => handleToggleWishlist(prod._id)}
                        >
                          <span style={{ fontSize: "20px" }}>{wishlistIds.includes(prod._id) ? "♥" : "♡"}</span>
                        </Button>
                      </div>
                      
                      <Card.Body className="d-flex flex-column p-4">
                        {prod.category?.name && (
                          <span style={{ color: "#6366f1", fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                            {prod.category.name}
                          </span>
                        )}
                        
                        <Card.Title style={{ fontWeight: "700", color: "#1e1b4b", fontSize: "1.1rem", marginBottom: "5px" }} className="text-truncate" title={prod.name}>
                          {prod.name}
                        </Card.Title>
                        
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span style={{ color: "#1e1b4b", fontWeight: "800", fontSize: "1.3rem" }}>₹{prod.price}</span>
                          <div style={{ background: "#fffbeb", color: "#d97706", padding: "4px 8px", borderRadius: "8px", fontSize: "0.85rem", fontWeight: "600" }}>
                             ★ {prod.rating || 0}
                          </div>
                        </div>
                        
                        <Card.Text className="text-muted flex-grow-1" style={{ fontSize: "0.9rem", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: "20px" }}>
                          {prod.description}
                        </Card.Text>
                        
                        <Button
                          className="w-100 fw-semibold"
                          style={{
                            background: prod.countInStock === 0 ? "#e5e7eb" : "linear-gradient(90deg, #6366f1, #8b5cf6)",
                            border: "none",
                            borderRadius: "50px",
                            padding: "10px",
                            color: prod.countInStock === 0 ? "#9ca3af" : "white",
                            boxShadow: prod.countInStock === 0 ? "none" : "0 10px 20px rgba(99, 102, 241, 0.2)"
                          }}
                          onClick={() => handleAddToCart(prod._id)}
                          disabled={prod.countInStock === 0}
                        >
                          {prod.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col xs={12}>
                  <div className="text-center p-5" style={{ background: "white", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
                    <div style={{ fontSize: "80px", marginBottom: "20px" }}>🔍</div>
                    <h3 style={{ fontWeight: "700", color: "#1e1b4b", marginBottom: "15px" }}>No products found</h3>
                    <p className="text-muted mb-4 fs-5">We couldn't find anything matching your search criteria.</p>
                    <Button 
                      onClick={handleClearFilters}
                      style={{
                        background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
                        border: "none",
                        padding: "12px 30px",
                        borderRadius: "50px",
                        fontWeight: "600",
                        boxShadow: "0 10px 20px rgba(236, 72, 153, 0.2)"
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </Col>
              )}
            </Row>
          </Col>
        </Row>

        <ToastContainer position="top-right" autoClose={2500} theme="colored" />
        <style>{`
          .product-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 40px rgba(0,0,0,0.1) !important;
          }
          .product-card:hover .product-img {
            transform: scale(1.05);
          }
        `}</style>
      </Container>
    </div>
  );
}

export default ProductPage;
