import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );
  const navigate = useNavigate();
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const usernameRegex = /^[A-Za-z][A-Za-z0-9]{2,}$/;
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|io|co|in)$/;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const errors: { [key: string]: string } = {};

    if (!usernameRegex.test(name)) {
      errors.name =
        "Username must start with a letter and contain only letters and numbers.";
    }

    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be at least 8 characters and include at least 1 letter and 1 number.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      setLoading(false);
      return;
    }

    alert("Registration successful!");
    setLoading(false);
    setErrorMessages({});
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    navigate("/login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h2 className="card-title mb-4 text-center">Register</h2>
          <form onSubmit={handleSignupSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {errorMessages.name && (
                <small className="text-danger">{errorMessages.name}</small>
              )}
            </div>

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

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control form-control-lg"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {errorMessages.confirmPassword && (
                <small className="text-danger">
                  {errorMessages.confirmPassword}
                </small>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn "
                style={{
                  backgroundColor: "#970747",
                  color: "#fff",
                }}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
              <p className="mt-3 mb-0">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
