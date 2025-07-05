import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface Props {
  onSuccess: () => void;
}

const AddProductForm: React.FC<Props> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "0",
    tag: "",
    image_url: "",
  });
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const token = localStorage.getItem("adminToken") || "";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.name.trim() || !form.price.trim()) {
      setError("Name and Price are required.");
      return;
    }

    setAdding(true);

    try {
      await axios.post(
        "http://localhost:4500/backend/admin/products",
        {
          ...form,
          price: parseFloat(form.price),
          stock: parseInt(form.stock),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("✅ Product added successfully!");
      setForm({
        name: "",
        price: "",
        description: "",
        stock: "0",
        tag: "",
        image_url: "",
      });
      onSuccess();
    } catch (err) {
      console.error(err);
      setError("❌ Failed to add product. Try again.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      className="card shadow-sm p-4 mx-auto"
      style={{ maxWidth: 600, border: "1px solid #eee", borderRadius: "12px" }}
    >
      <h3 className="text-center fw-bold mb-4" style={{ color: "#970747" }}>
        Add New Product
      </h3>

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {success && (
        <div className="alert alert-success text-center">{success}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Name *</label>
          <input
            name="name"
            className="form-control"
            placeholder="Enter product name"
            value={form.name}
            onChange={handleChange}
            disabled={adding}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Price *</label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            className="form-control"
            placeholder="Enter price"
            value={form.price}
            onChange={handleChange}
            disabled={adding}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Stock</label>
          <input
            name="stock"
            type="number"
            min="0"
            className="form-control"
            placeholder="Available quantity"
            value={form.stock}
            onChange={handleChange}
            disabled={adding}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Tag</label>
          <input
            name="tag"
            className="form-control"
            placeholder="Category or tag"
            value={form.tag}
            onChange={handleChange}
            disabled={adding}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows={3}
            placeholder="Brief description"
            value={form.description}
            onChange={handleChange}
            disabled={adding}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">Image URL</label>
          <input
            name="image_url"
            className="form-control"
            placeholder="https://example.com/image.jpg"
            value={form.image_url}
            onChange={handleChange}
            disabled={adding}
          />
        </div>

        <button
          type="submit"
          className="btn w-100 fw-semibold"
          style={{
            backgroundColor: "#970747",
            color: "#fff",
            fontSize: "16px",
            padding: "10px",
          }}
          disabled={adding}
        >
          {adding ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
