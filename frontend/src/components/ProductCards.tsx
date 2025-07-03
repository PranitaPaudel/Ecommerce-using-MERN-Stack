import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating?: number;
  features?: string[];
  reviews?: { stars: number; comment: string }[];
  image_url: string;
}

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<Product[]>(
          "http://localhost:4500/backend/products"
        );
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );

  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <Row className="mt-4">
      {products.map((product) => (
        <Col key={product.id} xs={12} sm={6} md={4} lg={4} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={product.image_url}
              style={{
                width: "100%",
                height: "auto",
                margin: "0 auto",
                display: "block",
              }}
            />
            <Card.Body
              style={{
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <Card.Title
                style={{
                  fontSize: "20px",
                  marginTop: "4px",
                  marginBottom: "10px",
                }}
              >
                {product.name}
              </Card.Title>
              <Link to={`/product/${product.id}`}>
                <Button
                  style={{
                    backgroundColor: "#970747",
                    color: "#fff",
                    borderColor: "#970747",
                  }}
                >
                  View Product
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductCards;
