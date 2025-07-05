import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./pages/Home";
import ProductCards from "./components/ProductCards";
import ProductPage from "./components/ProductPage";
import CartPage from "./pages/CartPage";
import UserAccount from "./pages/UserAccount";
import CategoryPage from "./pages/CategoryPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin"; // <-- import admin login page

// Route protection for admin pages
const RequireAdminAuth: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <RequireAdminAuth>
            <AdminDashboard />
          </RequireAdminAuth>
        }
      />
      {/* Redirect /admin to admin login or dashboard based on auth */}
      <Route
        path="/admin"
        element={
          localStorage.getItem("adminToken") ? (
            <Navigate to="/admin/dashboard" replace />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />

      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<UserAccount />} />
      <Route path="/search" element={<SearchResultsPage />} />

      {/* Catch-all fallback to home or 404 page (optional) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
