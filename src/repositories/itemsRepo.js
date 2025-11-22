import prisma from "../config/db.js";

export async function getAll(filter) {
  const conditions = {};

  if (filter.search) {
    conditions.OR = [
      { title: { contains: filter.search, mode: "insensitive" } },
      { content: { contains: filter.search, mode: "insensitive" } },
    ];
  }

  const posts = await prisma.post.findMany({
    where: conditions,
    select: {
      id: true,
      title: true,
      content: true,
      userId: true,
      createdAt: true,
    },
    orderBy: { [filter.sortBy]: filter.sortOrder },
    take: filter.limit,
    skip: filter.offset,
  });

  return posts;
}
