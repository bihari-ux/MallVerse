import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Badge, Form, Card, Row, Col, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useSEO from "../hooks/useSEO";
import "react-toastify/dist/ReactToastify.css";

const CART_URL = "http://localhost:5000/api/cart";
const ORDER_URL = "http://localhost:5000/api/orders";

function CheckoutPage() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  
  // Shipping Address State
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  
  useSEO({
    title: "Checkout",
    description: "Complete your secure checkout.",
  });
  
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`${CART_URL}/${user.id}`);
      const data = await res.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/logIn");
      return;
    }
    fetchCart();
  }, [isLoggedIn, user, navigate]);

  // Calculations
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = cartItems.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0);
  const shippingPrice = itemsPrice > 500 ? 0 : 50; // Free shipping over ₹500
  const taxPrice = Number((0.18 * itemsPrice).toFixed(2)); // 18% GST
  const totalPrice = Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      setError("Please fill in all shipping address fields.");
      setSubmitting(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You are not logged in. Please login first.");
      setSubmitting(false);
      logout();
      navigate("/logIn");
      return;
    }

    try {
      const orderItems = cartItems
        .filter((item) => item.productId && item.productId._id)
        .map((item) => ({
          product: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          quantity: item.quantity,
          image: item.productId.imageUrl
        }));

      if (orderItems.length === 0) {
        throw new Error("Your cart contains invalid or deleted products. Please clear your cart and try again.");
      }

      const res = await fetch(ORDER_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });

      // Handle 401 - session expired
      if (res.status === 401) {
        toast.error("Session expired. Please login again.");
        logout();
        navigate("/logIn");
        return;
      }

      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error(`Server returned non-JSON response (Status: ${res.status})`);
      }

      if (!res.ok) throw new Error(data.message || "Order failed");

      setOrderPlaced(true);
      toast.success("Order placed successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to place order");
      setError(err.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <Container className="py-5 text-center">
        <h2 className="text-success mb-3"> Order Placed Successfully!</h2>
        <p className="text-muted fs-5">Thank you for your purchase.</p>
        <p className="fs-4">
          Total Paid: <Badge bg="success" className="fs-5">₹{totalPrice.toFixed(2)}</Badge>
        </p>
        <Button variant="primary" className="mt-3" onClick={() => navigate("/products")}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 text-primary fw-bold"> Checkout</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-muted fs-5">Your cart is empty. Add items first.</p>
          <Button variant="primary" onClick={() => navigate("/products")}>
            Browse Products
          </Button>
        </div>
      ) : (
        <Row>
          <Col md={7}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-3">Shipping Address</h5>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={shippingAddress.address} onChange={handleAddressChange} required placeholder="123 Main St" />
                  </Form.Group>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city" value={shippingAddress.city} onChange={handleAddressChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type="text" name="postalCode" value={shippingAddress.postalCode} onChange={handleAddressChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" name="country" value={shippingAddress.country} onChange={handleAddressChange} required />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h5 className="mb-3">Payment Method</h5>
                <Form.Check 
                  type="radio" 
                  label="Credit Card (Stripe)" 
                  name="paymentMethod" 
                  value="Stripe" 
                  checked={paymentMethod === "Stripe"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <Form.Check 
                  type="radio" 
                  label="PayPal" 
                  name="paymentMethod" 
                  value="PayPal" 
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <Form.Check 
                  type="radio" 
                  label="Cash On Delivery (COD)" 
                  name="paymentMethod" 
                  value="COD" 
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </Card.Body>
            </Card>

            <h5 className="mb-3">Order Items</h5>
            <Table striped bordered hover size="sm" className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  const product = item.productId;
                  if (!product) return null;
                  return (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "10px", borderRadius: "4px" }} />}
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td>₹{product.price}</td>
                      <td>{item.quantity}</td>
                      <td>₹{(product.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>

          <Col md={5}>
            <Card className="shadow-sm border-primary">
              <Card.Body>
                <h5 className="mb-4 border-bottom pb-2">Order Summary</h5>
                <Row className="mb-2">
                  <Col>Items:</Col>
                  <Col className="text-end">₹{addDecimals(itemsPrice)}</Col>
                </Row>
                <Row className="mb-2">
                  <Col>Shipping:</Col>
                  <Col className="text-end">₹{addDecimals(shippingPrice)}</Col>
                </Row>
                <Row className="mb-2">
                  <Col>Tax (18% GST):</Col>
                  <Col className="text-end">₹{addDecimals(taxPrice)}</Col>
                </Row>
                <Row className="mb-3 fw-bold fs-5">
                  <Col>Total:</Col>
                  <Col className="text-end text-primary">₹{addDecimals(totalPrice)}</Col>
                </Row>

                <hr />

                {paymentMethod !== "COD" && (
                  <Form className="mb-3">
                    <Form.Group className="mb-2">
                      <Form.Label className="small text-muted">Cardholder Name</Form.Label>
                      <Form.Control type="text" name="cardName" value={paymentInfo.cardName} onChange={handlePaymentChange} placeholder="Enter name" required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label className="small text-muted">Card Number</Form.Label>
                      <Form.Control type="text" name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} placeholder="**** **** **** ****" maxLength="19" required />
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Control type="text" name="expiry" value={paymentInfo.expiry} onChange={handlePaymentChange} placeholder="MM/YY" maxLength="5" required />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Control type="password" name="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} placeholder="CVV" maxLength="3" required />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                )}

                <Button
                  variant="primary"
                  className="w-100 fw-bold py-2 mt-2"
                  disabled={submitting}
                  onClick={handlePlaceOrder}
                >
                  {submitting ? "Processing..." : `Place Order (₹${addDecimals(totalPrice)})`}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </Container>
  );
}

export default CheckoutPage;
