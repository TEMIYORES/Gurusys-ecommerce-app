import { Request, Response } from "express";
import { Order } from "../models/Order";
import axios from "axios";
import https from "https";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const foundOrders = await Order.find();
    res.status(200).json(foundOrders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { products, customerInfo, origin, total, transactionFee } = req.body;
    console.log({ products });
    const params = JSON.stringify({
      email: customerInfo.email,
      amount: (total + transactionFee) * 100,
      currency: "NGN",
      callback_url: origin,
    });

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };
    const paystackReq = https
      .request(options, (paystackRes) => {
        let data = "";

        paystackRes.on("data", (chunk: any) => {
          data += chunk;
        });

        paystackRes.on("end", async () => {
          const parsedData = JSON.parse(data);
          console.log({ parsedData });
          const paymentUrl = parsedData.data.authorization_url;
          const paymentReference = parsedData.data.reference;
          await Order.create({
            reference: paymentReference,
            products,
            totalAmount: total,
            customerInfo,
          });
          return res.status(200).json({ paymentUrl });
        });
      })
      .on("error", (error: any) => {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Payment failed. Please try again later." });
      });
    paystackReq.write(params);
    paystackReq.end();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ message: `Id parameter is required!` });
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json", // setting Content-Type header
        },
      }
    );
    if (
      response.data.data.status === "success" &&
      response.data.data.reference
    ) {
      const fulfilledOrder = await Order.findOne({
        reference: response.data.data.reference,
      }).exec();
      if (!fulfilledOrder)
        return res
          .status(204)
          .json({ message: `No Order with OrderId ${id} Found.` });

      fulfilledOrder.status = "Paid";
      fulfilledOrder.save();
      return res.status(200).json({ fulfilledOrder });
    } else {
      return res.status(402).json({ message: "Payment Required." });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res
      .status(500)
      .json({ message: "Verification failed. Please try again later." });
  }
};
