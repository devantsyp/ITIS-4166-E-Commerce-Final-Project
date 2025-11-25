import express from "express";

import {
  validateItemsQuery,
  validateProductId,
  validateCreateProduct,
  validateUpdateProduct,
} from "../middleware/queryValidator.js";
import {
  getAllProductsHandler,
  getProductByIdHandler,
  createProductHandler,
  deleteProductHandler,
  updateProductHandler,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", validateItemsQuery, getAllProductsHandler);
router.get("/:id", validateProductId, getProductByIdHandler);
router.post("/", validateCreateProduct, createProductHandler);
router.delete("/:id", validateProductId, deleteProductHandler);
router.patch("/:id", validateUpdateProduct, updateProductHandler);

export default router;
