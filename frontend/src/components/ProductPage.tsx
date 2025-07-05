import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { useCart } from "../context/cartContext";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart: updateCartCount } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Invalid product ID.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:4500/backend/products/${id}`
        );
        const fetched = res.data;
        fetched.price = parseFloat(fetched.price);
        setProduct(fetched);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const isLoggedIn = () => !!localStorage.getItem("user");

  const addToCart = async (productToAdd: Product) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user) {
        alert("You must be logged in to add items to cart.");
        navigate("/login");
        return;
      }

      // 1. Call backend to actually add item to cart
      await axios.post("http://localhost:4500/backend/cart/add", {
        userId: user.id,
        productId: productToAdd.id,
        quantity: 1,
      });

      // 2. Optionally also update localStorage or context if you want
      if (typeof updateCartCount === "function") {
        updateCartCount(); // to refresh cart icon count maybe
      }

      alert("Product added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Something went wrong while adding to cart.");
    }
  };

  const handleProtectedAction = () => {
    if (!isLoggedIn()) {
      alert("You must be logged in to add items to your cart.");
      navigate("/login");
    } else if (product) {
      addToCart(product);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center my-5">
            {error}
          </Alert>
        ) : product ? (
          <>
            <Row className="align-items-start">
              <Col md={5} className="text-center mb-4 mb-md-0">
                <img
                  src={product.image_url || "https://via.placeholder.com/400"}
                  alt={product.name}
                  className="img-fluid rounded shadow"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    border: "2px solid #f0f0f0",
                  }}
                />
              </Col>

              <Col md={7}>
                <h2 className="fw-bold mb-3" style={{ color: "#970747" }}>
                  {product.name}
                </h2>
                <p className="fs-5">
                  <strong>Price:</strong>{" "}
                  <span style={{ color: "#970747" }}>
                    Rs. {product.price.toFixed(2)}
                  </span>
                </p>
                <div
                  className="p-3 mb-3 rounded"
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderLeft: "4px solid #970747",
                  }}
                >
                  <h6 className="text-muted mb-1">Description</h6>
                  <p
                    className="mb-0"
                    style={{ color: "#444", lineHeight: "1.6" }}
                  >
                    {product.description}
                  </p>
                </div>

                <Button
                  onClick={handleProtectedAction}
                  style={{
                    backgroundColor: "#970747",
                    borderColor: "#970747",
                  }}
                  className="px-4 py-2"
                >
                  Add to Cart
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <div className="text-center my-5">Product not found.</div>
        )}
      </Container>
    </>
  );
};

export default ProductPage;
