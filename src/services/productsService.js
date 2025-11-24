import {
  getAll,
  getById,
  create,
  remove,
  update,
} from "../repositories/productsRepo.js";

export async function getAllProducts(filter) {
  return await getAll(filter);
}

export async function getProductById(id) {
  return await getById(id);
}

export async function createProduct(data) {
  const product = await create(data);
  return product;
}

export async function deleteProduct(id) {
  return await remove(id);
}

export async function updateProduct(id, data) {
  const product = await update(id, data);
  return product;
}
