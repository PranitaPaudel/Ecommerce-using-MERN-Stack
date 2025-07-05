import express from "express";
import { placeOrder, getUserOrders } from "../controllers/orders.js";
const router = express.Router();

router.post("/place", placeOrder);
router.get("/user/:userId", getUserOrders);

export default router;
