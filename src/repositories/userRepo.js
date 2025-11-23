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
  console.log("users are " + users);
  return users;
}
