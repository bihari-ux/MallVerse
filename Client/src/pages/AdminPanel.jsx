import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Button, Table, Modal, Spinner, Tabs, Tab, Card, Badge, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;
const CATEGORY_URL = `${import.meta.env.VITE_API_URL}/api/categories`;
const ORDERS_URL = `${import.meta.env.VITE_API_URL}/api/orders`;

function AdminPanel() {
  const { isAdmin, isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // State for Products
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "", description: "", image: null, category: "", brand: "", countInStock: "" });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  
  // State for Categories
  const [categories, setCategories] = useState([]);

  // State for Orders
  const [orders, setOrders] = useState([]);
  
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/logIn");
      return;
    }
    if (!isAdmin) return; // Don't fetch data if not admin
    fetchProducts();
    fetchCategories();
    fetchOrders();
  }, [isLoggedIn, isAdmin, navigate]);

  // If not admin, show access denied
  if (!isAdmin) {
    return (
      <Container className="py-5 text-center">
        <div style={{
          maxWidth: "500px",
          margin: "80px auto",
          padding: "50px 30px",
          background: "linear-gradient(135deg, #fee2e2, #fecaca)",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "60px", marginBottom: "20px" }}>🔒</div>
          <h2 className="text-danger fw-bold mb-3">Access Denied</h2>
          <p className="text-muted fs-5 mb-4">
            You don't have admin privileges to access this page.
          </p>
          <p className="text-muted mb-4">
            Logged in as: <strong>{user?.name || user?.email || "User"}</strong> (Role: {user?.role || "user"})
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </div>
        <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      </Container>
    );
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Fetch failed");
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(CATEGORY_URL);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Fetch failed");
      setCategories(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${ORDERS_URL}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data || []);
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  };

  // --- Product Handlers ---
  const handleProductChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = new FormData();
      form.append("name", formData.name.trim());

      const price = Number(formData.price);
      if (isNaN(price) || price <= 0) {
        toast.error("Please enter a valid positive price");
        setSubmitting(false);
        return;
      }

      form.append("price", price);
      form.append("description", formData.description.trim());
      if (formData.category) form.append("category", formData.category);
      if (formData.brand) form.append("brand", formData.brand.trim());
      if (formData.countInStock) form.append("countInStock", formData.countInStock);

      if (formData.image) {
        form.append("image", formData.image);
      }

      const method = editingProduct ? "PUT" : "POST";
      const endpoint = editingProduct ? `${API_URL}/${editingProduct._id}` : API_URL;

      const res = await fetch(endpoint, { method, body: form });

      let result = {};
      try {
        result = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) throw new Error(result.message || "Operation failed");

      toast.success(editingProduct ? "Product updated!" : "Product created!");
      setFormData({ name: "", price: "", description: "", image: null, category: "", brand: "", countInStock: "" });
      setImagePreview(null);
      setEditingProduct(null);
      setShowProductModal(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to submit product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Delete failed");
      toast.success("Product deleted!");
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  const openProductModalForAdd = () => {
    setEditingProduct(null);
    setFormData({ name: "", price: "", description: "", image: null, category: "", brand: "", countInStock: "" });
    setImagePreview(null);
    setShowProductModal(true);
  };

  const openProductModalForEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      price: product.price?.toString() || "",
      description: product.description || "",
      category: product.category?._id || product.category || "",
      brand: product.brand || "",
      countInStock: product.countInStock?.toString() || "",
      image: null,
    });
    setImagePreview(product.imageUrl || null);
    setShowProductModal(true);
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold mb-0">🛡️ Admin Dashboard</h2>
        <Badge bg="danger" className="fs-6 px-3 py-2">Admin: {user?.name || "Admin"}</Badge>
      </div>

      {/* Quick Stats */}
      <div className="d-flex gap-3 mb-4 flex-wrap">
        <Card className="border-0 shadow-sm flex-fill" style={{ minWidth: "150px" }}>
          <Card.Body className="text-center">
            <h3 className="text-primary fw-bold mb-1">{products.length}</h3>
            <small className="text-muted">Products</small>
          </Card.Body>
        </Card>
        <Card className="border-0 shadow-sm flex-fill" style={{ minWidth: "150px" }}>
          <Card.Body className="text-center">
            <h3 className="text-success fw-bold mb-1">{categories.length}</h3>
            <small className="text-muted">Categories</small>
          </Card.Body>
        </Card>
        <Card className="border-0 shadow-sm flex-fill" style={{ minWidth: "150px" }}>
          <Card.Body className="text-center">
            <h3 className="text-warning fw-bold mb-1">{orders.length}</h3>
            <small className="text-muted">Orders</small>
          </Card.Body>
        </Card>
      </div>

      <Tabs defaultActiveKey="products" id="admin-tabs" className="mb-4">
        {/* PRODUCTS TAB */}
        <Tab eventKey="products" title="Manage Products">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Products ({products.length})</h4>
                <Button variant="success" onClick={openProductModalForAdd}>+ Add Product</Button>
              </div>
              <Table striped bordered hover responsive className="align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price (₹)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((prod, index) => (
                      <tr key={prod._id}>
                        <td>{index + 1}</td>
                        <td>
                          {prod.imageUrl ? (
                            <img src={prod.imageUrl} alt={prod.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }} />
                          ) : "No Image"}
                        </td>
                        <td>{prod.name}<br/>
                          <small className="text-muted">{prod.brand || "No Brand"}</small><br/>
                          <small className="fw-bold text-success">Sold: {prod.sold || 0}</small> | <small className="fw-bold text-primary">Stock: {prod.countInStock || 0}</small>
                        </td>
                        <td>₹{prod.price}</td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openProductModalForEdit(prod)}>Edit</Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDeleteProduct(prod._id)}>Delete</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="text-center text-muted">No products available.</td></tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        {/* CATEGORIES TAB */}
        <Tab eventKey="categories" title="Manage Categories">
           <Card className="shadow-sm border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Categories ({categories.length})</h4>
              </div>
              <Table striped bordered hover responsive>
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <tr key={cat._id}>
                        <td>{cat.name}</td>
                        <td>{cat.description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="2" className="text-center text-muted">No categories available.</td></tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        {/* ORDERS TAB */}
        <Tab eventKey="orders" title="Manage Orders">
           <Card className="shadow-sm border-0">
            <Card.Body>
              <h4 className="mb-4">Recent Orders ({orders.length})</h4>
              {orders.length > 0 ? (
                <Table striped bordered hover responsive className="align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Order ID</th>
                      <th>Total (₹)</th>
                      <th>Payment</th>
                      <th>Paid</th>
                      <th>Delivered</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, i) => (
                      <tr key={order._id}>
                        <td>{i + 1}</td>
                        <td><small className="text-muted">{order._id.slice(-8)}</small></td>
                        <td>₹{order.totalPrice?.toFixed(2)}</td>
                        <td>{order.paymentMethod}</td>
                        <td>
                          <Badge bg={order.isPaid ? "success" : "danger"}>
                            {order.isPaid ? "Paid" : "Pending"}
                          </Badge>
                        </td>
                        <td>
                          <Badge bg={order.isDelivered ? "success" : "warning"}>
                            {order.isDelivered ? "Delivered" : "Pending"}
                          </Badge>
                          <div className="mt-2">
                            <small className="fw-bold d-block">Items:</small>
                            <ul className="list-unstyled mb-0" style={{ fontSize: "0.85rem" }}>
                              {order.orderItems?.map((item, idx) => (
                                <li key={idx}>- {item.name} x {item.quantity}</li>
                              ))}
                            </ul>
                          </div>
                        </td>
                        <td>
                          {new Date(order.createdAt).toLocaleDateString()}
                          <div className="mt-1">
                            <small className="text-muted">By: {order.userId?.name || order.userId?.email || "Unknown"}</small>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">No orders yet.</Alert>
              )}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Modal for Add/Edit Product */}
      <Modal show={showProductModal} onHide={() => setShowProductModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleProductSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleProductChange} required disabled={submitting} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control type="number" name="price" value={formData.price} onChange={handleProductChange} required min="0.01" step="0.01" disabled={submitting} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" rows={3} value={formData.description} onChange={handleProductChange} disabled={submitting} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="productCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={formData.category} onChange={handleProductChange} disabled={submitting}>
                <option value="">Select Category (Optional)</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="productBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Control type="text" name="brand" value={formData.brand} onChange={handleProductChange} disabled={submitting} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="productCountInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control type="number" name="countInStock" value={formData.countInStock} onChange={handleProductChange} min="0" disabled={submitting} />
            </Form.Group>
            
            <Form.Group controlId="productImage">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" name="image" accept="image/*" onChange={handleProductChange} disabled={submitting} />
            </Form.Group>
            {imagePreview && (
              <div className="mt-3 text-center">
                <img src={imagePreview} alt="Preview" style={{ maxHeight: "150px", maxWidth: "100%", objectFit: "contain" }} />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowProductModal(false)} disabled={submitting}>Cancel</Button>
            <Button variant="success" type="submit" disabled={submitting}>
              {submitting ? <><Spinner animation="border" size="sm" /> Saving...</> : (editingProduct ? "Update" : "Create")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ToastContainer position="top-right" autoClose={2500} theme="colored" />
    </Container>
  );
}

export default AdminPanel;

