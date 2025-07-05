// controllers/admin.js (or .ts)
import db from "../db.js"; // your DB connection

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      stock = 0,
      tag = null,
      image_url,
    } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    const sql = `INSERT INTO products (name, price, description, stock, tag, image_url) VALUES (?, ?, ?, ?, ?, ?)`;
    await db.query(sql, [name, price, description, stock, tag, image_url]);

    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ error: "Error adding product" });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
// Update Product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    description,
    stock = 0,
    tag = null,
    image_url,
  } = req.body;

  // Validate required fields
  if (!name || !price) {
    return res.status(400).json({ error: "Name and price are required" });
  }

  try {
    const sql = `
      UPDATE products
      SET name = ?, price = ?, description = ?, stock = ?, tag = ?, image_url = ?
      WHERE id = ?
    `;
    const [result] = await db.query(sql, [
      name,
      price,
      description,
      stock,
      tag,
      image_url,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ error: "Error updating product" });
  }
};
export const getAllOrders = async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT o.id, o.user_id, o.total_amount, o.created_at, u.name as user_name
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
