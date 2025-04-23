import React from "react";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import Navbar from "../components/navbar";

const CartPage: React.FC = () => {
  const cartItems = [
    {
      name: "Product Description",
      price: 100,
      quantity: 3,
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = 0;
  const deliveryCharge = 150;
  const total = subtotal - discount + deliveryCharge;

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Row className="mb-4">
          <Col>
            <h4>My Cart</h4>
          </Col>
          <Col className="text-end">
            <Button variant="light" style={{ backgroundColor: "#f0f0f0" }}>
              My Location
            </Button>
          </Col>
        </Row>

        <Table striped bordered>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th>Items</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>Rs.{item.price}</td>
                <td>{item.quantity}</td>
                <td>Rs.{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Row className="my-4">
          <Col md={4}>
            <Form.Label>Vouchers :</Form.Label>
            <Form.Control type="text" placeholder="Enter voucher code" />
          </Col>
          <Col md={8}>
            <div
              className="p-3"
              style={{ backgroundColor: "#f0f0f0", borderRadius: "8px" }}
            >
              <p>Subtotal: Rs.{subtotal}</p>
              <p>Discount: Rs.{discount}</p>
              <p>Delivery Charge: Rs.{deliveryCharge}</p>
              <hr />
              <h5>Total: Rs.{total}</h5>
              <div className="d-grid mt-3">
                <Button
                  style={{
                    backgroundColor: "#970747",
                    borderColor: "#970747",
                    color: "white",
                  }}
                >
                  Check Out
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartPage;
