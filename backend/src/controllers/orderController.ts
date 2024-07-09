import { Request, Response } from "express";
import { Order } from "../models/Order";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { products, totalAmount, customerName, customerEmail } = req.body;
    const order = new Order({
      products,
      totalAmount,
      customerName,
      customerEmail,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.productId"
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
