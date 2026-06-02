import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Form, Button, Tabs, Tab, Alert, Badge } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSEO from "../hooks/useSEO";

const ProfilePage = () => {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useSEO({
    title: "My Profile",
    description: "Manage your profile, orders, and addresses.",
  });

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  
  // Mock Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Welcome to MallVerse E-commerce!", date: new Date().toLocaleDateString(), read: false },
    { id: 2, text: "Your profile has been successfully created.", date: new Date().toLocaleDateString(), read: true },
  ]);

  const [newAddress, setNewAddress] = useState({
    fullName: "", phone: "", street: "", city: "", state: "", country: "", postalCode: "", isDefault: false
  });

  useEffect(() => {
    if (!user) {
      navigate("/logIn");
    } else {
      fetchAddresses();
      fetchOrders();
    }
  }, [user, navigate]);

  const fetchAddresses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/addresses", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (res.ok) setAddresses(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/myorders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (res.ok) setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Profile Updated");
        login(data.token, data); // update context
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newAddress),
      });
      if (res.ok) {
        toast.success("Address Added");
        fetchAddresses();
        setNewAddress({ fullName: "", phone: "", street: "", city: "", state: "", country: "", postalCode: "", isDefault: false });
      } else {
        toast.error("Failed to add address");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={3}>
          <Card className="mb-4 text-center p-3 shadow-sm border-0 bg-light">
            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3 shadow" style={{ width: "90px", height: "90px", fontSize: "2.5rem", fontWeight: "bold" }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h4 className="fw-bold">{user?.name}</h4>
            <p className="text-muted">{user?.email}</p>
            <Button variant="outline-danger" onClick={() => { logout(); navigate("/logIn"); }} className="mt-2 w-100 fw-bold">Logout</Button>
          </Card>
        </Col>
        <Col md={9}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Tabs defaultActiveKey="profile" id="profile-tabs" className="mb-4">
                <Tab eventKey="profile" title="Edit Profile">
                  <Form onSubmit={handleUpdateProfile}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <hr />
                    <h5>Change Password</h5>
                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="fw-bold">Update Profile</Button>
                  </Form>
                </Tab>

                <Tab eventKey="addresses" title="My Addresses">
                  <Row>
                    {addresses.map((addr) => (
                      <Col md={6} key={addr._id} className="mb-3">
                        <Card className={`h-100 ${addr.isDefault ? 'border-primary' : ''}`}>
                          <Card.Body>
                            <Card.Title>{addr.fullName} {addr.isDefault && <Badge bg="primary" className="ms-2">Default</Badge>}</Card.Title>
                            <Card.Text>
                              {addr.street}<br />
                              {addr.city}, {addr.state} {addr.postalCode}<br />
                              {addr.country}<br />
                              Phone: {addr.phone}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <hr />
                  <h5 className="mb-3 fw-bold">Add New Address</h5>
                  <Form onSubmit={handleAddAddress}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Control type="text" placeholder="Full Name" value={newAddress.fullName} onChange={e => setNewAddress({...newAddress, fullName: e.target.value})} required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Control type="text" placeholder="Phone" value={newAddress.phone} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} required />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Control type="text" placeholder="Street Address" value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} required />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Control type="text" placeholder="City" value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} required />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Control type="text" placeholder="State" value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} required />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Control type="text" placeholder="Postal Code" value={newAddress.postalCode} onChange={e => setNewAddress({...newAddress, postalCode: e.target.value})} required />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Control type="text" placeholder="Country" value={newAddress.country} onChange={e => setNewAddress({...newAddress, country: e.target.value})} required />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                         <Form.Group className="mb-3">
                          <Form.Check type="checkbox" label="Set as Default Address" checked={newAddress.isDefault} onChange={e => setNewAddress({...newAddress, isDefault: e.target.checked})} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button type="submit" variant="success" className="fw-bold">Save Address</Button>
                  </Form>
                </Tab>

                <Tab eventKey="orders" title="Order History">
                  {orders.length === 0 ? (
                    <Alert variant="info" className="fw-bold">You haven't placed any orders yet.</Alert>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map(order => (
                            <tr key={order._id}>
                              <td>{order._id.substring(0, 8)}...</td>
                              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                              <td>₹{order.totalPrice.toFixed(2)}</td>
                              <td>{order.isPaid ? <Badge bg="success">Yes</Badge> : <Badge bg="danger">No</Badge>}</td>
                              <td>{order.isDelivered ? <Badge bg="success">Yes</Badge> : <Badge bg="danger">No</Badge>}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Tab>
                
                <Tab eventKey="notifications" title={`Notifications ${notifications.filter(n => !n.read).length > 0 ? `(${notifications.filter(n => !n.read).length})` : ''}`}>
                  {notifications.length === 0 ? (
                    <Alert variant="light">No notifications.</Alert>
                  ) : (
                    <div className="list-group">
                      {notifications.map((notif) => (
                        <div key={notif.id} className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${!notif.read ? 'bg-light border-primary border-start border-4' : ''}`}>
                          <div>
                            <div className="d-flex w-100 justify-content-between">
                              <h6 className="mb-1">{notif.text}</h6>
                            </div>
                            <small className="text-muted">{notif.date}</small>
                          </div>
                          {!notif.read && (
                            <Button variant="link" size="sm" onClick={() => markNotificationAsRead(notif.id)}>Mark as read</Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
