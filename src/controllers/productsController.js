import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../services/productsService.js";

export async function getAllProductsHandler(req, res, next) {
  const {
    search,
    sortBy = "createdAt",
    sortOrder = "asc",
    limit = 10,
    offset = 0,
  } = req.query;

  // used to normalize the sortOrder query
  const normalizedSortOrder =
    sortOrder === "asc" || sortOrder === "desc" ? sortOrder : "desc";

  const filter = {};
  if (search) filter.search = search;
  filter.sortBy = sortBy;
  filter.sortOrder = normalizedSortOrder;
  filter.limit = Number(limit);
  filter.offset = Number(offset);

  try {
    let result = await getAllProducts(filter);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getProductByIdHandler(req, res, next) {
  let id = Number(req.params.id);
  try {
    let result = await getProductById(id);
    if (!result) {
      const e = new Error(`Product with id ${id} not found`);
      e.status = 404;
      throw e;
    }
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function createProductHandler(req, res, next) {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function deleteProductHandler(req, res, next) {
  try {
    const id = Number(req.params.id);

    await deleteProduct(id);

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

export async function updateProductHandler(req, res, next) {
  const id = Number(req.params.id);
  try {
    const updated = await updateProduct(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    if (err.code === "P2025") {
      const e = new Error(`Product with id ${id} not found`);
      e.status = 404;
      throw e;
    }
    next(err);
  }
}
