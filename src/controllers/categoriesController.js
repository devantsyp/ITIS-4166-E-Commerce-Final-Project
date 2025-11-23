import prisma from "../prisma/index.js";

export const getCategories = async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};

export const getCategory = async (req, res) => {
  const category = await prisma.category.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!category) return res.status(404).json({ message: "Not found" });
  res.json(category);
};

export const createCategory = async (req, res) => {
  const { name } = req.body;

  const newCategory = await prisma.category.create({ data: { name } });
  res.status(201).json(newCategory);
};

export const updateCategory = async (req, res) => {
  const updated = await prisma.category.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(updated);
};

export const deleteCategory = async (req, res) => {
  await prisma.category.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
};
