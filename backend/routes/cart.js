import express from "express";
import db from "../db.js";

const router = express.Router();

// Add item to cart
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId || quantity == null) {
    return res.status(400).json({ error: "Missing data" });
  }

  const query = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
  `;

  try {
    const [result] = await db.query(query, [userId, productId, quantity]);
    console.log("Add to cart result:", result);
    res.json({ message: "Item added to cart" });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// Get cart items for a user
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const query = `
    SELECT c.product_id, c.quantity, p.name, p.price, p.image_url
    FROM cart c
    JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;

  try {
    const [results] = await db.query(query, [userId]);
    res.json(results);
  } catch (err) {
    console.error("Fetch cart error:", err);
    res.status(500).json({ error: "Failed to load cart" });
  }
});

// Update or remove item in cart
router.post("/update", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const [result] = await db.query(
      "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    if (result.length > 0) {
      if (quantity === 0) {
        await db.query(
          "DELETE FROM cart WHERE user_id = ? AND product_id = ?",
          [userId, productId]
        );
        return res.status(200).json("Removed from cart");
      } else {
        await db.query(
          "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?",
          [quantity, userId, productId]
        );
        return res.status(200).json("Cart updated");
      }
    } else {
      await db.query(
        "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
        [userId, productId, quantity]
      );
      return res.status(201).json("Added to cart");
    }
  } catch (err) {
    console.error("Update cart error:", err);
    return res.status(500).json({ error: "Failed to update cart" });
  }
});

// Get cart count for a user
router.get("/count/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const [results] = await db.query(
      "SELECT SUM(quantity) AS count FROM cart WHERE user_id = ?",
      [userId]
    );

    const count = results[0].count || 0;
    res.json({ count });
  } catch (err) {
    console.error("Cart count fetch error:", err);
    res.status(500).json({ error: "Failed to get cart count" });
  }
});


export default router;
