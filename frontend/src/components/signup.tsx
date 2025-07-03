import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const { name, email, password, confirmPassword } = form;
    const usernameRegex = /^[A-Za-z][A-Za-z0-9]{2,}$/;
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|io|co|in)$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    const validationErrors: { [key: string]: string } = {};

    if (!usernameRegex.test(name)) {
      validationErrors.name =
        "Username must start with a letter and be at least 3 characters.";
    }

    if (!emailRegex.test(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    // if (!passwordRegex.test(password)) {
    //   validationErrors.password =
    //     "Password must be at least 8 characters, including 1 letter and 1 number.";
    // }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    return validationErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:4500/backend/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      setForm({ name: "", email: "", password: "", confirmPassword: "" });
      setErrors({});
      navigate("/login");
    } catch (err) {
      const error = err as any;
      if (error.response?.data) {
        setErrors({ general: error.response.data });
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h2 className="card-title mb-4 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            {["name", "email", "password", "confirmPassword"].map((field) => (
              <div className="mb-3" key={field}>
                <label htmlFor={field} className="form-label">
                  {field === "confirmPassword"
                    ? "Confirm Password"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field.includes("password") ? "password" : "text"}
                  className={`form-control form-control-lg ${
                    errors[field] ? "is-invalid" : ""
                  }`}
                  id={field}
                  name={field}
                  value={form[field as keyof typeof form]}
                  onChange={handleChange}
                  required
                />
                {errors[field] && (
                  <div className="invalid-feedback">{errors[field]}</div>
                )}
              </div>
            ))}

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-lg w-100"
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
