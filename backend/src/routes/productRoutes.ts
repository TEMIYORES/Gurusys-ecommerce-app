import { Router } from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController";
import fileUpload from "express-fileupload";
const router = Router();

router.get("/products", getProducts);
router.post("/products", fileUpload({ createParentPath: true }), createProduct);
router.put("/products", fileUpload({ createParentPath: true }), updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
