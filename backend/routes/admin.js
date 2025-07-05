import express from "express";
import {
  addProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getAllOrders,
} from "../controllers/admin.js";

const router = express.Router();

router.post("/products", addProduct);
router.get("/products", getAllProducts);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);
router.get("/orders", getAllOrders);

export default router;
