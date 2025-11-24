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
      price: true,
      categoryId: true,
      description: true,
      category: true,
      createdAt: true,
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
      createdAt: true,
    },
  });

  return product;
}

export async function create(productData) {
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description ?? null,
      price: productData.price,
      categoryId: Number(productData.categoryId),
    },
    select: {
      id: true,
      name: true,
      price: true,
      categoryId: true,
      description: true,
      category: true,
      createdAt: true,
    },
  });

  return product;
}

export async function remove(id) {
  await prisma.product.delete({
    where: { id: Number(id) },
  });
}
