import express from "express";

import {
  validateItemsQuery,
  validateProductId,
  validateCreateProduct,
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
router.delete("/:id", deleteProductHandler);
router.put("/:id", updateProductHandler);

export default router;
