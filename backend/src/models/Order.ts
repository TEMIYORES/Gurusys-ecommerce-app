import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  totalAmount: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  status: { type: String, default: "Pending" },
});

export const Order = model("Order", orderSchema);
