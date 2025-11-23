import express from "express";
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/ordersController.js";
// import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// USER routes
router.post("/", auth, OrderController.createOrder);
router.get("/me", auth, OrderController.getMyOrders);

// ADMIN routes
router.get("/", auth, checkRole("ADMIN"), OrderController.getAllOrders);
router.put(
  "/:orderId/status",
  auth,
  checkRole("ADMIN"),
  OrderController.updateOrderStatus
);

module.exports = router;

export default router;
