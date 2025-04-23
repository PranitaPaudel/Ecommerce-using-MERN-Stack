import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dummyEmail = "pranita@gmail.com";
    const dummyPassword = "password123";

    const errors: { [key: string]: string } = {};

    if (email !== dummyEmail) {
      errors.email = "Invalid email address.";
    }

    if (password !== dummyPassword) {
      errors.password = "Invalid password.";
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      setLoading(false);
      return;
    }

    // alert("Login successful!");
    setLoading(false);
    setErrorMessages({});
    setEmail("");
    setPassword("");
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h2 className="card-title mb-4 text-center">Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errorMessages.email && (
                <small className="text-danger">{errorMessages.email}</small>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errorMessages.password && (
                <small className="text-danger">{errorMessages.password}</small>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: "#970747",
                  color: "#fff",
                }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <p className="mt-3 mb-0">
                Don't have an account? <Link to="/signup">Signup</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
