import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "../components/navbar";

const UserAccount: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem("user")!);

  useEffect(() => {
    axios
      .get(`http://localhost:4500/backend/orders/user/${user.id}`)
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]));
  }, [user.id]);

  return (
    <>
      <Navbar />
      <Container className="py-5">
        <Row>
          <Col md={8} className="mx-auto">
            <h2 className="mb-4" style={{ color: "#970747" }}>
              My Profile
            </h2>
            <Card className="p-4 shadow-sm mb-4">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </Card>
            <h4 style={{ color: "#970747" }}>Order History</h4>
            {orders.length === 0 ? (
              <Card className="p-3 mb-4 shadow-sm text-muted">
                No orders yet
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id} className="p-3 mb-3 shadow-sm">
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Total:</strong> Rs. {order.total_amount}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </Card>
              ))
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserAccount;
