import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Home from "./pages/Home";
import ProductCards from "./components/ProductCards";
import ProductPage from "./components/ProductPage";
import CartPage from "./pages/CartPage";
import UserAccount from "./pages/UserAccount";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<UserAccount />} />
    </Routes>
  );
}

export default App;
