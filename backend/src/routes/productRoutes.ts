import { Router } from "express";
import { getProducts, createProduct } from "../controllers/productController";
import fileUpload from "express-fileupload";
const router = Router();

router.get("/products", getProducts);
router.post("/products", fileUpload({ createParentPath: true }), createProduct);

export default router;
