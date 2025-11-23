import express from "express";
import { getMe, updateMe, deleteMe } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin-only
router.get("/", auth, checkRole("ADMIN"), UserController.getAllUsers);

// Authenticated user actions
router.get("/me", auth, UserController.getProfile);
router.put("/me", auth, UserController.updateProfile);
router.delete("/me", auth, UserController.deleteAccount);

module.exports = router;

export default router;
