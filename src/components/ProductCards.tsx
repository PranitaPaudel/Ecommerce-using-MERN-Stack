import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import image1 from "../assets/productImages/b4f62806-2428-460c-8e3e-c79eb573d1e5.jpg";

const products = [
  {
    id: 1,
    title: "Product One",
    description: "This is a short description of product one.",
    image: image1,
  },
  {
    id: 2,
    title: "Product Two",
    description: "This is a short description of product two.",
    image: image1,
  },
  {
    id: 3,
    title: "Product Three",
    description: "This is a short description of product three.",
    image: image1,
  },
  {
    id: 4,
    title: "Product Four",
    description: "This is a short description of product four.",
    image: image1,
  },
];

const ProductCards: React.FC = () => {
  return (
    <Row className="mt-4">
      {products.map((product) => (
        <Col key={product.id} xs={12} sm={6} md={4} lg={4} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "200px",
                margin: "0 auto",
                display: "block",
              }}
            />

            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>

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
