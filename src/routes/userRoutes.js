import express from "express";
import {
  getAllUsersHandler,
  getUserByIdHandler,
  getMeHandler,
} from "../controllers/userController.js";

import { protect } from "../middleware/authValidator.js";

// import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin-only
// Previous Line:
// router.get("/", auth, checkRole("ADMIN"), UserController.getAllUsers);
router.get("/", getAllUsersHandler);
router.get("/id/:id", getUserByIdHandler);

// Authenticated user actions
router.get("/me", protect, getMeHandler);
//router.put("/me", auth, UserController.updateProfile);
//router.delete("/me", auth, UserController.deleteAccount);

export default router;
