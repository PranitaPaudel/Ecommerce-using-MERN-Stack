import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import Navbar from "../components/navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

interface CartItem {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryCharge = 150;
  const total = subtotal + deliveryCharge;

  useEffect(() => {
    const fetchCartItems = async () => {
      const userRaw = localStorage.getItem("user");
      if (!userRaw) {
        alert("You must be logged in to view your cart.");
        navigate("/login");
        return;
      }
      const user = JSON.parse(userRaw);
      try {
        const res = await axios.get(
          `http://localhost:4500/backend/cart/${user.id}`
        );
        const processed = res.data.map((item: any) => ({
          ...item,
          price: parseFloat(item.price),
          quantity: Number(item.quantity),
        }));
        setCartItems(processed);
      } catch (err) {
        setError("Failed to load your cart.");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
    detectLocation();
  }, [navigate]);

  const detectLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(
            `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`
          );
        },
        () => setLocation("Unable to detect location")
      );
    } else {
      setLocation("Geolocation not supported");
    }
  };
  const handleRemove = async (productId: number) => {
    const user = JSON.parse(localStorage.getItem("user")!);
    try {
      await axios.post("http://localhost:4500/backend/cart/update", {
        userId: user.id,
        productId,
        quantity: 0, // removes item
      });
      setCartItems(cartItems.filter((item) => item.product_id !== productId));
    } catch (err) {
      alert("Failed to remove item from cart.");
    }
  };
  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (!location || cartItems.length === 0) {
      alert("Please ensure location is set and cart is not empty.");
      return;
    }
    try {
      await axios.post("http://localhost:4500/backend/orders/place", {
        user_id: user.id,
        total_amount: total,
        items: cartItems,
      });
      alert("Order placed successfully!");
      setCartItems([]);
    } catch (err) {
      alert("Failed to place order.");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Container className="text-center mt-5">
          <Spinner animation="border" />
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Row className="mb-4">
          <Col>
            <h4>My Cart</h4>
          </Col>
          <Col className="text-end">
            <Button variant="light" onClick={detectLocation}>
              {location ? "Location Set ✅" : "Set My Location"}
            </Button>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}

        {cartItems.length === 0 ? (
          <Alert variant="info" className="text-center">
            Your cart is empty.
          </Alert>
        ) : (
          <>
            <Table striped bordered>
              <thead>
                <tr style={{ backgroundColor: "#f0f0f0" }}>
                  <th>Items</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>Rs.{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>Rs.{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      {" "}
                      <button
                        onClick={() => handleRemove(item.product_id)}
                        className="btn btn-sm btn-outline-danger mt-1 d-flex align-items-center gap-1"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Row className="my-4">
              <Col md={6}>
                {location && (
                  <Alert variant="info">
                    📍 <strong>Delivery Location:</strong> {location}
                  </Alert>
                )}
              </Col>
              <Col md={6}>
                <div className="p-3 bg-light rounded">
                  <p>Subtotal: Rs.{subtotal.toFixed(2)}</p>
                  <p>Delivery Charge: Rs.{deliveryCharge}</p>
                  <hr />
                  <h5>Total: Rs.{total.toFixed(2)}</h5>
                  <div className="d-grid mt-3">
                    <Button
                      onClick={handleCheckout}
                      style={{
                        backgroundColor: "#970747",
                        borderColor: "#970747",
                        color: "white",
                      }}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default CartPage;
