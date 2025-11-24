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
  try {
    await remove(id);
  } catch (err) {
    if (err.code === "P2025") {
      const error = new Error(`Product with id ${id} not found`);
      error.status = 404;
      throw error;
    }
    throw err;
  }
}

export async function updateProduct(id, data) {
  const product = await update(id, data);
  return product;
}
