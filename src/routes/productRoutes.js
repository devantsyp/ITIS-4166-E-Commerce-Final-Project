import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();


// PUBLIC
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);

// ADMIN (product management)
router.post("/", auth, checkRole("ADMIN"), ProductController.createProduct);
router.put("/:id", auth, checkRole("ADMIN"), ProductController.updateProduct);
router.delete("/:id", auth, checkRole("ADMIN"), ProductController.deleteProduct);

module.exports = router;

export default router;
