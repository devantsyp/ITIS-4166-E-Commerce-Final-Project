import express from "express";
import {
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  checkoutCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authValidator.js";

const router = express.Router();

router.use(protect); // All cart endpoints require authentication

router.get("/", getCart);
router.post("/", addItemToCart);
router.put("/:itemId", updateCartItem);
router.delete("/:itemId", removeCartItem);
router.post("/checkout", checkoutCart);

export default router;
