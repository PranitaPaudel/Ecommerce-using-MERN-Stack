// routes/search.js
import express from "express";
import db from "../db.js"; 

const router = express.Router();

// Simple case-insensitive search
const naiveSearch = (text, pattern) =>
  text.toLowerCase().includes(pattern.toLowerCase());

router.get("/", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const [rows] = await db.query("SELECT * FROM products");

    const results = rows.filter((product) => {
      return (
        naiveSearch(product.name || "", query) ||
        naiveSearch(product.description || "", query) ||
        naiveSearch(product.tag || "", query)
      );
    });

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;
