// src/controllers/user.controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../db/client');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../middleware/auth');

// POST /users/register (public)
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: 'USER', // default from your enum
      },
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Failed to register user' });
  }
}

// POST /users/login (public)
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const matches = await bcrypt.compare(password, user.password);
    if (!matches) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Failed to login' });
  }
}

// GET /users/me (auth + ownership)
async function getMe(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.json(user);
  } catch (err) {
    console.error('GetMe error:', err);
    return res.status(500).json({ error: 'Failed to fetch user profile' });
  }
}

// PUT /users/me (auth + ownership)
async function updateMe(req, res) {
  try {
    const { name, email, password } = req.body;
    const data = {};

    if (name) data.name = name;
    if (email) data.email = email;
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const updated = await prisma.user.update({
      where: { id: req.user.userId },
      data,
      select: { id: true, name: true, email: true, role: true },
    });

    return res.json(updated);
  } catch (err) {
    console.error('UpdateMe error:', err);

    // Prisma unique constraint error (e.g. duplicate email)
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'Email already in use' });
    }

    return res.status(500).json({ error: 'Failed to update profile' });
  }
}

// DELETE /users/me (auth + ownership)
async function deleteMe(req, res) {
  try {
    await prisma.user.delete({
      where: { id: req.user.userId },
    });
    return res.status(204).send();
  } catch (err) {
    console.error('DeleteMe error:', err);
    return res.status(500).json({ error: 'Failed to delete account' });
  }
}

// GET /users (admin only)
async function listUsers(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { id: 'asc' },
    });

    return res.json(users);
  } catch (err) {
    console.error('ListUsers error:', err);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
}

module.exports = {
  register,
  login,
  getMe,
  updateMe,
  deleteMe,
  listUsers,
};
