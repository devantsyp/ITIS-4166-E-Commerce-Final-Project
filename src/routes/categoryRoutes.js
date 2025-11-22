import express from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", CategoryController.getAllCategories);
router.get("/:id/products", CategoryController.getProductsByCategory);

// ADMIN
router.post("/", auth, checkRole("ADMIN"), CategoryController.createCategory);
router.put("/:id", auth, checkRole("ADMIN"), CategoryController.updateCategory);
router.delete("/:id", auth, checkRole("ADMIN"), CategoryController.deleteCategory);

module.exports = router;
