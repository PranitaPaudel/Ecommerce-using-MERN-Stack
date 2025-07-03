import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Navbar from "../components/navbar";

const UserAccount: React.FC = () => {
  const user = {
    name: "Abc xyz",
    birthday: "23444432",
    address: "asmcksn sknlkd",
    gender: "female",
    email: "abc@gmail.com",
  };

  const wishlistItem = {
    name: "Product Name",
    price: 200,
  };

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
                <strong>Birthday:</strong> {user.birthday}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
              <p>
                <strong>Gender:</strong> {user.gender}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <div className="d-flex gap-3 mt-3">
                <Button style={{ backgroundColor: "#970747", border: "none" }}>
                  Edit Profile
                </Button>
                <Button variant="outline-dark">Change Password</Button>
              </div>
            </Card>

            <h4 style={{ color: "#970747" }}>Order History</h4>
            <Card className="p-3 mb-4 shadow-sm text-muted">No orders yet</Card>

            <h4 style={{ color: "#970747" }}>My Reviews</h4>
            <Card className="p-3 mb-4 shadow-sm text-muted">
              No reviews yet
            </Card>

            <h4 style={{ color: "#970747" }}>My Wishlist</h4>
            <Card className="p-3 shadow-sm">
              <Row className="align-items-center">
                <Col xs={3}>
                  <div
                    className="bg-light border rounded"
                    style={{ width: 80, height: 80 }}
                  />
                </Col>
                <Col xs={4}>
                  <strong>{wishlistItem.name}</strong>
                </Col>
                <Col xs={2}>Rs. {wishlistItem.price}</Col>
                <Col xs={3}>
                  <Button
                    size="sm"
                    style={{ backgroundColor: "#970747", border: "none" }}
                  >
                    Add to Cart
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserAccount;
