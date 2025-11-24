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
  getUserById,
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

export async function getUserByIdHandler(req, res, next) {
  try {
    const users = await getUserById(Number(req.params.id));
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}
