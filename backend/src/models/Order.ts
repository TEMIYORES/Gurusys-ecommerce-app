import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    reference: { type: String, required: true },
    products: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    customerInfo: { type: Object, required: true },
    status: { type: String, default: "Pending" },
  },
  {
    timestamps: true,
  }
);

export const Order = model("Order", orderSchema);
