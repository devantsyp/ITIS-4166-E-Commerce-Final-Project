import prisma from "../config/db.js";

export async function getAll(filter) {
  const conditions = {};

  if (filter.search) {
    conditions.OR = [
      { title: { contains: filter.search, mode: "insensitive" } },
      { content: { contains: filter.search, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where: conditions,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      category: true,
    },
    orderBy: { [filter.sortBy]: filter.sortOrder },
    take: filter.limit,
    skip: filter.offset,
  });

  return products;
}

export async function getById(id) {
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      price: true,
      categoryId: true,
      description: true,
      category: true,
    },
  });

  return product;
}
