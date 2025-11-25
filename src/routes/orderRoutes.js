import express from "express";
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/ordersController.js";
import { protect } from "../middleware/authValidator.js";
// import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// USER routes
// router.post("/", auth, OrderController.createOrder);
// router.get("/me", auth, OrderController.getMyOrders);

//order routes
router.use(protect);
router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

// ADMIN routes
// router.get("/", auth, checkRole("ADMIN"), OrderController.getAllOrders);
// router.put(
//   "/:orderId/status",
//   auth,
//   checkRole("ADMIN"),
//   OrderController.updateOrderStatus
// );

//module.exports = router;

export default router;
