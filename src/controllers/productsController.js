import prisma from "../prisma/index.js";

export const getProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const getProduct = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
};

export const createProduct = async (req, res) => {
  const { name, price, description, categoryId } = req.body;

  const newProduct = await prisma.product.create({
    data: { name, price, description, categoryId },
  });

  res.status(201).json(newProduct);
};

export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });

  res.json(updated);
};

export const deleteProduct = async (req, res) => {
  await prisma.product.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
};
