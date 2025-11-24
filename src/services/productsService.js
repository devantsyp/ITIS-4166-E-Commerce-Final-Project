import { getAll, getById } from "../repositories/productsRepo.js";

export async function getAllProducts(filter) {
  return await getAll(filter);
}

export async function getProductById(id) {
  return await getById(id);
}
