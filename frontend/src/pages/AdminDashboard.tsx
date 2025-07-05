import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, LayoutList, ShoppingCart, LogOut } from "lucide-react";
import AddProductForm from "../components/AddProductForm";
import ProductListingAdmin from "../components/ProductListingAdmin";
import OrderListingAdmin from "../components/OrderListingAdmin";

const AdminDashboard: React.FC = () => {
  const [view, setView] = useState("add");
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken") || "";

  useEffect(() => {
    if (!token) navigate("/admin/login");
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className="d-flex flex-column justify-content-between text-white"
        style={{
          width: "250px",
          backgroundColor: "#970747",
          position: "sticky",
          top: 0,
          maxHeight: "100vh",
          padding: "20px",
        }}
      >
        <div>
          <h4 className="text-center fw-bold mb-3">Admin Panel</h4>
          <p className="text-center fw-semibold mb-4">Welcome, Admin</p>
          <div className="d-grid gap-2">
            <button
              onClick={() => setView("add")}
              className={`btn ${
                view === "add"
                  ? "btn-light text-dark"
                  : "btn-outline-light text-white"
              }`}
            >
              <PlusCircle size={18} className="me-2" />
              Add Product
            </button>
            <button
              onClick={() => setView("list")}
              className={`btn ${
                view === "list"
                  ? "btn-light text-dark"
                  : "btn-outline-light text-white"
              }`}
            >
              <LayoutList size={18} className="me-2" />
              Product List
            </button>
            <button
              onClick={() => setView("orders")}
              className={`btn ${
                view === "orders"
                  ? "btn-light text-dark"
                  : "btn-outline-light text-white"
              }`}
            >
              <ShoppingCart size={18} className="me-2" />
              Orders
            </button>
          </div>
        </div>

        <div>
          <hr className="border-light" />
          <button
            onClick={handleLogout}
            className="btn btn-outline-light w-100 text-white"
          >
            <LogOut size={18} className="me-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light" style={{ overflowY: "auto" }}>
        {view === "add" && <AddProductForm onSuccess={() => setView("list")} />}
        {view === "list" && <ProductListingAdmin />}
        {view === "orders" && <OrderListingAdmin />}
      </div>
    </div>
  );
};

export default AdminDashboard;
