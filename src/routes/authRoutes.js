import express from "express";
import { register, login } from "../controllers/authController.js";
import {
  validateRegisterQuery,
  validateLoginQuery,
} from "../middleware/authValidator.js";
const router = express.Router();

router.post("/register", validateRegisterQuery, register);
router.post("/login", validateLoginQuery, login);

export default router;
