import express from "express";
import db from "../db.js"; // your mysql connection (promise based)

const router = express.Router();

// GET distinct product categories
router.get("/categories", async (req, res) => {
  const query = "SELECT DISTINCT tag FROM products";
  try {
    const [rows] = await db.query(query);
    const categories = rows.map((row) => row.tag);
    res.json(categories);
  } catch (err) {
    console.error("Failed to fetch categories", err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Get all products
router.get("/", async (req, res) => {
  const query = "SELECT * FROM products ORDER BY created_at DESC";
  try {
    const [data] = await db.query(query);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [
      productId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Failed to fetch product:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// (Optional) Add new product - admin only
router.post("/", async (req, res) => {
  const { name, description, price, stock, image_url } = req.body;
  if (!name || !price || !stock) {
    return res
      .status(400)
      .json({ error: "Name, price, and stock are required." });
  }
  const query =
    "INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)";
  try {
    await db.query(query, [name, description, price, stock, image_url]);
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
});

// Get products by category/tag
router.get("/category/:tag", async (req, res) => {
  const { tag } = req.params;
  const query = "SELECT * FROM products WHERE tag = ?";
  try {
    const [rows] = await db.query(query, [tag]);
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch category products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default router;
