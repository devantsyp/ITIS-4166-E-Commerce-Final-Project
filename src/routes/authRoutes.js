import express from "express";
import { register, login } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;

export default router;
