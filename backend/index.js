import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import searchRoutes from "./routes/search.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable CORS: client server domain compatibility
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/backend/auth", authRoutes);
app.use("/backend/products", productRoutes);
app.use("/backend/cart", cartRoutes);
app.use("/backend/search", searchRoutes);

app.listen(4500, () => {
  console.log("Server is running on port 4500");
});
