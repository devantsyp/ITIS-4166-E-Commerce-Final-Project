import { getAll } from "../repositories/itemsRepo.js";

export async function getAllItems(filter) {
  return await getAll(filter);
}
