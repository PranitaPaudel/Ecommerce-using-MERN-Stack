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

  const addToCart = (productToAdd: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const index = cart.findIndex((item: any) => item.id === productToAdd.id);
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...productToAdd, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // update context cart count
    alert("Product added to cart!");
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
      <Container className="mt-4">
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
            <Row>
              <Col md={5}>
                <img
                  src={product.image_url || "https://via.placeholder.com/400"}
                  alt={product.name}
                  className="img-fluid"
                  style={{ width: "100%", maxWidth: "400px" }}
                />
              </Col>
              <Col md={7}>
                <h3>{product.name}</h3>
                <hr />
                <p>
                  <strong>Price:</strong> Rs. {product.price.toFixed(2)}
                </p>
                <Button
                  onClick={handleProtectedAction}
                  style={{ backgroundColor: "#970747", borderColor: "#970747" }}
                  className="me-2"
                >
                  Add to Cart
                </Button>
              </Col>
            </Row>

            <Row className="mt-5">
              <Col>
                <h5>Product Description</h5>
                <p>{product.description}</p>
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
