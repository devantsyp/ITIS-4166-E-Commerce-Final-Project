import { getAllProducts, getProductById } from "../services/productsService.js";

export async function getAllProductsHandler(req, res) {
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

  let result = await getAllProducts(filter);
  res.status(200).json(result);
}

export async function getProductByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let result = await getProductById(id);
  res.status(200).json(result);
}
