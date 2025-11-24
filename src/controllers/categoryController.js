import * as categoryRepo from "../repositories/categoryRepo.js";

export const getCategories = async (req, res) => {
  const categories = await categoryRepo.findAllCategories();
  res.json(categories);
};

export const getCategory = async (req, res) => {
  const category = await categoryRepo.findCategoryById(req.params.id);
  if (!category) return res.status(404).json({ message: "Not found" });
  res.json(category);
};

export const createCategory = async (req, res) => {
  const newCategory = await categoryRepo.createCategoryRecord(req.body.name);
  res.status(201).json(newCategory);
};

export const updateCategory = async (req, res) => {
  const updated = await categoryRepo.updateCategoryRecord(
    req.params.id,
    req.body
  );
  res.json(updated);
};

export const deleteCategory = async (req, res) => {
  await categoryRepo.deleteCategoryRecord(req.params.id);
  res.status(204).send();
};
