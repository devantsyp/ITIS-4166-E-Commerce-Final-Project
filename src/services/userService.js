import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getAll } from "../repositories/userRepo.js";

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
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
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

export const me = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

export const getMe = async () => {
  return me;
};

export const updateMe = async (req, res) => {
  const { email, password } = req.body;

  const data = {};
  if (email) data.email = email;
  if (password) data.password = await bcrypt.hash(password, 10);

  const updated = await prisma.user.update({
    where: { id: req.user.id },
    data,
  });

  res.json(updated);
};

export const deleteMe = async (req, res) => {
  await prisma.user.delete({ where: { id: req.user.id } });
  res.status(204).send();
};
