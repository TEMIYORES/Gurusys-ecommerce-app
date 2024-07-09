import { Router } from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../controllers/productController";
import fileUpload from "express-fileupload";
const router = Router();

router.get("/products", getProducts);
router.post("/products", fileUpload({ createParentPath: true }), createProduct);
router.delete("/products", deleteProduct);

export default router;
