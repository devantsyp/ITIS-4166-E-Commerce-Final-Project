import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  getAll,
  getById,
  getMe,
  deleteMe,
  updateMe,
} from "../repositories/userRepo.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ message: "Email exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashed, role: "USER" },
  });

  res.status(201).json({ id: user.id, name, email, role: "USER" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return res
      .status(400)
      .json({ message: "User with specified email was not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Password is incorrect" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: { id: user.id, name: user.name, email, role: user.role },
  });
};

export async function getAllUsers() {
  const result = await getAll();
  return result;
}

export async function getUserById(id) {
  const result = await getById(id);
  return result;
}

export async function getCurrentUser(userId) {
  return await getMe(userId);
}

export async function deleteCurrentUser() {
  const result = await deleteMe();
  return result;
}

export async function updateCurrentUser() {
  const result = await updateMe();
  return result;
}
