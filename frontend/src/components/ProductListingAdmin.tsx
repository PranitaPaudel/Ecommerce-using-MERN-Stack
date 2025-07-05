import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description?: string;
  tag?: string;
  image_url?: string;
}

const ProductListingAdmin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    tag: "",
    image_url: "",
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("adminToken") || "";

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4500/backend/admin/products",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`http://localhost:4500/backend/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Edit button clicked - populate form
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description || "",
      tag: product.tag || "",
      image_url: product.image_url || "",
    });
  };

  // Form input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit edited product
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setLoading(true);

    try {
      await axios.put(
        `http://localhost:4500/backend/admin/products/${editingProduct.id}`,
        {
          name: form.name.trim(),
          price: parseFloat(form.price),
          stock: parseInt(form.stock, 10),
          description: form.description.trim(),
          tag: form.tag.trim(),
          image_url: form.image_url.trim(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await fetchProducts();

      // Clear editing state & form
      setEditingProduct(null);
      setForm({
        name: "",
        price: "",
        stock: "",
        description: "",
        tag: "",
        image_url: "",
      });
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingProduct(null);
    setForm({
      name: "",
      price: "",
      stock: "",
      description: "",
      tag: "",
      image_url: "",
    });
  };

  return (
    <div>
      <h3 className="mb-4 fw-bold" style={{ color: "#970747" }}>
        Product List
      </h3>

      {/* Edit form */}
      {editingProduct && (
        <div
          className="card p-4 mb-4 shadow-sm"
          style={{ maxWidth: "650px", borderLeft: "5px solid #970747" }}
        >
          <h5 className="mb-3 fw-semibold text-dark">
            ✏️ Edit Product (ID: {editingProduct.id})
          </h5>
          <form onSubmit={handleUpdate}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  name="stock"
                  type="number"
                  className="form-control"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  name="tag"
                  className="form-control"
                  placeholder="Tag"
                  value={form.tag}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 mb-3">
                <textarea
                  name="description"
                  className="form-control"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  rows={2}
                />
              </div>
              <div className="col-12 mb-4">
                <input
                  name="image_url"
                  className="form-control"
                  placeholder="Image URL"
                  value={form.image_url}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn me-2"
              style={{ backgroundColor: "#970747", color: "#fff" }}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={cancelEdit}
              disabled={loading}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Product Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow-sm">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price ($)</th>
              <th>Stock</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-outline-warning me-2"
                    onClick={() => handleEdit(p)}
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(p.id)}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListingAdmin;
