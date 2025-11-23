import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  register,
  login,
  getMe,
  deleteMe,
  updateMe,
  getAllUsers,
} from "../services/userService.js";

export async function getCurrentUserHandler() {
  return await getMe();
}

export async function getAllUsersHandler(req, res, next) {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}
