import express from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authValidator.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getCategories);
router.get("/:id", getCategory);

// ADMIN ROUTES (protected)
router.post("/", protect, admin, createCategory);
router.put("/:id", protect, admin, updateCategory);
router.delete("/:id", protect, admin, deleteCategory);

export default router;
