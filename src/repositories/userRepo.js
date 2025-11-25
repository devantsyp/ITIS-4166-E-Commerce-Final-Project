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
