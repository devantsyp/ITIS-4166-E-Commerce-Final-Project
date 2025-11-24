import express from "express";

import {
  validateItemsQuery,
  validateProductId,
} from "../middleware/queryValidator.js";
import {
  getAllProductsHandler,
  getProductByIdHandler,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", validateItemsQuery, getAllProductsHandler);
router.get("/:id", validateProductId, getProductByIdHandler);

export default router;
