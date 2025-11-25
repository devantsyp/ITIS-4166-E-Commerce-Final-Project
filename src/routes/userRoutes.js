import express from "express";
import {
  getAllUsersHandler,
  getUserByIdHandler,
} from "../controllers/userController.js";
// import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin-only
// Previous Line:
// router.get("/", auth, checkRole("ADMIN"), UserController.getAllUsers);
router.get("/", getAllUsersHandler);
router.get("/:id", getUserByIdHandler);

// Authenticated user actions
// router.get("/me", auth, UserController.getProfile);
//router.put("/me", auth, UserController.updateProfile);
//router.delete("/me", auth, UserController.deleteAccount);

export default router;
