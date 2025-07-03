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

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
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

      let user;
      try {
        user = JSON.parse(userRaw);
        if (!user.id) throw new Error("User ID missing.");
      } catch (err) {
        alert("Corrupted user session. Please log in again.");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:4500/backend/cart/${user.id}`,
          { timeout: 5000 }
        );

        console.log("Raw API response:", res.data);

        if (!Array.isArray(res.data)) {
          throw new Error("Unexpected cart format from server.");
        }

        const processed = res.data.map((item: any) => ({
          ...item,
          price: parseFloat(item.price),
          quantity: Number(item.quantity),
        }));

        console.log("Processed cart items:", processed);

        setCartItems(processed);
      } catch (err) {
        console.error("Fetch error:", err);
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

  const handleCheckout = () => {
    if (!location) {
      alert("Please allow location access before checking out.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    alert("Proceeding to checkout...");
    // navigate("/checkout");
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
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>Rs.{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>Rs.{(item.price * item.quantity).toFixed(2)}</td>
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
