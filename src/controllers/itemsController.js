import { getAllItems } from "../services/itemsService.js";

export async function getAllItemsHandler(req, res) {
  const {
    search,
    sortBy = "createdAt",
    sortOrder = "desc",
    limit = 10,
    offset = 0,
  } = req.query;

  const filter = {};
  if (search) filter.search = search;
  filter.sortBy = sortBy;
  filter.sortOrder = sortOrder;
  filter.limit = parseInt(limit);
  filter.offset = parseInt(offset);

  let result = await getAllItems(filter);
  res.status(200).json(result);
}
