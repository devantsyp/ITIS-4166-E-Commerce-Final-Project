import prisma from "../config/db.js";

export async function getAll() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return users;
}

export async function getById(id) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },

    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return user;
}

export async function getMe(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });
  return user;
}

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
