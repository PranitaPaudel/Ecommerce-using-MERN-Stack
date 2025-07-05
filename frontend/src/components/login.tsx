import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext must be used within AuthProvider");
  const { login } = auth;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessages({});
    setSuccessMessage("");

    const errors: { [key: string]: string } = {};

    // Client-side validation
    if (!email) {
      errors.email = "Email is required.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      setLoading(false);
      return;
    }

    try {
      await login(email.trim(), password); // <-- Use login from AuthContext

      setSuccessMessage("Login successful!");
      setEmail("");
      setPassword("");
      setErrorMessages({});

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Login failed. Please try again.";
        setErrorMessages({ general: errorMessage });
      } else {
        setErrorMessages({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h2 className="card-title mb-4 text-center">Login</h2>

          <form onSubmit={handleLoginSubmit}>
            {successMessage && (
              <div className="alert alert-success alert-dismissible fade show">
                {successMessage}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSuccessMessage("")}
                ></button>
              </div>
            )}

            {errorMessages.general && (
              <div className="alert alert-danger alert-dismissible fade show">
                {errorMessages.general}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setErrorMessages({})}
                ></button>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className={`form-control form-control-lg ${
                  errorMessages.email ? "is-invalid" : ""
                }`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
                required
              />
              {errorMessages.email && (
                <div className="invalid-feedback">{errorMessages.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control form-control-lg ${
                  errorMessages.password ? "is-invalid" : ""
                }`}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
                required
              />
              {errorMessages.password && (
                <div className="invalid-feedback">{errorMessages.password}</div>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-lg w-100 mb-3"
                style={{ backgroundColor: "#970747", color: "#fff" }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
              <p className="mb-0">
                Don't have an account?{" "}
                <Link to="/signup" className="text-decoration-none">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
