import db from "../db.js";

export const placeOrder = async (req, res) => {
  const { user_id, total_amount, items } = req.body;

  const connection = await db.getConnection(); // get a connection from pool
  try {
    await connection.beginTransaction();

    const [orderResult] = await connection.query(
      "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, 'pending')",
      [user_id, total_amount]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await connection.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    await connection.query("DELETE FROM cart WHERE user_id = ?", [user_id]);

    await connection.commit();

    res.json({ message: "Order placed successfully" });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: "Failed to place order" });
  } finally {
    connection.release();
  }
};

export const getUserOrders = async (req, res) => {
  const userId = req.params.userId;
  try {
    const [orders] = await db.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
