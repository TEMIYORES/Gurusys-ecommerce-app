import { Request, Response } from "express";
import { Product } from "../models/Product";
import { v2 as cloudinary } from "cloudinary";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock } = req.body;
    // Check for duplicates
    const duplicate = await Product.findOne({ name }).exec();
    if (duplicate)
      return res
        .status(409)
        .json({ message: "Product with the name already exists!" });

    try {
      let image: any = "";
      if (!req.files || typeof req.files !== "object") {
        return res.status(400).json({ message: "No files uploaded." });
      }
      const file = req.files.file;
      console.log(file);
      image = await uploadImage(file, "ecommerceapp");
      console.log({ image });

      await Product.create({
        name,
        description,
        price,
        stock,
        image,
      });

      return res.status(201).json({ message: "Product created successfully!" });
    } catch (err: any) {
      console.error(err.message);
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id, name, description, price, stock } = req.body;
    // Check for duplicates
    const foundProduct = await Product.findOne({ _id: id }).exec();
    if (!foundProduct)
      return res.status(409).json({ message: "No Product with the Id exist." });

    try {
      let image: any = "";
      if (!req.files || typeof req.files !== "object") {
        return res.status(400).json({ message: "No files uploaded." });
      }
      const file = req.files.file;
      console.log(file);
      image = await uploadImage(file, "ecommerceapp");
      console.log({ image });

      if (name) foundProduct.name = name;
      if (description) foundProduct.description = description;
      if (price) foundProduct.price = price;
      if (stock) foundProduct.stock = stock;
      if (image) foundProduct.image = image;
      foundProduct.save();
      return res.status(201).json({ message: "Product updated successfully!" });
    } catch (err: any) {
      console.error(err.message);
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ message: `Id parameter is required!` });

    try {
      const foundProductToDelete = await Product.findOne({
        _id: id,
      }).exec();

      if (!foundProductToDelete)
        return res
          .status(400)
          .json({ message: `No Product with ProductId ${id} Found.` });

      await foundProductToDelete.deleteOne({ _id: id });
      return res.status(200).json({
        message: `product ${foundProductToDelete.name} deleted successfully`,
      });
    } catch (err: any) {
      console.error(err.message);
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const uploadImage = (imageBuffer: any, folderName: string) => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: folderName, resource_type: "image" },
          (error: any, result: any) => {
            if (error) {
              console.error("error", error);
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        )
        .end(imageBuffer.data);
    });
  } catch (error) {
    console.error("error", error);
  }
};
