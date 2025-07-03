import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
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
              The Everything Store is your one-stop destination for a diverse range of products,
              from everyday essentials to unique finds. We aim to provide quality items at
              competitive prices, ensuring a seamless shopping experience for all our customers.
              Our commitment to customer satisfaction and continuous innovation drives us to
              expand our offerings and enhance your shopping journey every day.
            </p>
          </div>

          {/* Right Column: Contact Form */}
          <div className="col-md-6">
            <h5 className="fw-bold">Contact Us</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="userEmail" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="userEmail"
                  placeholder="name@example.com"
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
