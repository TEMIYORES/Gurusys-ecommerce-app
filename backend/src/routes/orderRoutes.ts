import { Router } from "express";
import { createOrder, getOrder } from "../controllers/orderController";

const router = Router();

router.post("/orders", createOrder);
router.get("/orders/:id", getOrder);

export default router;
