import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  getAllUsers,
  getUserById,
  getCurrentUser,
  deleteCurrentUser,
  updateCurrentUser,
} from "../services/userService.js";

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

export async function getMeHandler(req, res, next) {
  try {
    console.log("REQ.USER in /users/me:", req.user);

    const userId = req.user?.id ?? req.user?.userId;

    if (!userId) {
      const err = new Error("Authentication required");
      err.status = 401;
      throw err;
    }

    const user = await getCurrentUser(Number(userId));

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
