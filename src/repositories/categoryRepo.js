import prisma from "../config/db.js";

export const findAllCategories = async () => {
  return await prisma.category.findMany();
};

export const findCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: { id: Number(id) },
  });
};

export const createCategoryRecord = async (name) => {
  return await prisma.category.create({
    data: { name },
  });
};

export const updateCategoryRecord = async (id, data) => {
  return await prisma.category.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteCategoryRecord = async (id) => {
  return await prisma.category.delete({
    where: { id: Number(id) },
  });
};
