import { getAll } from "../repositories/productsRepo.js";

export async function getAllItems(filter) {
  return await getAll(filter);
}
