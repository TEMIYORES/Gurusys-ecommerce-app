import { Router } from "express";
import {
  createOrder,
  verifyOrder,
  getOrders,
} from "../controllers/orderController";

const router = Router();

router.get("/orders", getOrders);
router.post("/orders", createOrder);
router.get("/orders/verify/:id", verifyOrder);

export default router;
