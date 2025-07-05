import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "admin123";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      // Simple frontend check
      if (
        form.email.trim() === ADMIN_EMAIL &&
        form.password === ADMIN_PASSWORD
      ) {
        // Set a dummy token or flag in localStorage
        localStorage.setItem("adminToken", "dummy-admin-token");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid admin credentials");
      }
      setLoading(false);
    }, 800); // simulate async delay
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="card p-4 shadow" style={{ width: 360, borderRadius: 12 }}>
        <h2 className="mb-4 text-center">Admin Login</h2>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control form-control-lg"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter admin email"
              required
              disabled={loading}
              autoComplete="username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control form-control-lg"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            style={{ backgroundColor: "#970747", color: "#fff" }}
            className="btn w-100 btn-lg"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
