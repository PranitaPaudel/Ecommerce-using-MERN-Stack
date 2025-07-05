import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email: string): boolean => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!message.trim()) {
      alert("Message cannot be empty.");
      return;
    }

    alert("Message sent successfully!");

    // Optionally reset form
    setEmail("");
    setMessage("");
  };

  return (
    <footer
      style={{ backgroundColor: "#970747", color: "#fff" }}
      className="py-5 mt-auto"
    >
      <div className="container">
        <div className="row">
          {/* Left Column: Store Description */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h5 className="fw-bold">About Us</h5>
            <p>
              The Everything Store is your one-stop destination for a diverse
              range of products, from everyday essentials to unique finds. We
              aim to provide quality items at competitive prices, ensuring a
              seamless shopping experience for all our customers.
            </p>
          </div>

          {/* Right Column: Contact Form */}
          <div className="col-md-6">
            <h5 className="fw-bold">Contact Us</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="userEmail" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="userEmail"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="userMessage" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="userMessage"
                  rows={3}
                  placeholder="Your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-light">
                Send
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mt-4">
          <small>
            &copy; {new Date().getFullYear()} The Everything Store. All rights
            reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
