import React, { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  id: number;
  user_id: number;
  user_name?: string;
  total_amount: number;
  created_at: string;
}

const OrderListingAdmin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const token = localStorage.getItem("adminToken") || "";

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4500/backend/admin/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(data);
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h3 className="mb-4" style={{ color: "#970747" }}>
        All Orders
      </h3>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_name || `User ${order.user_id}`}</td>
                <td>${order.total_amount}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderListingAdmin;
