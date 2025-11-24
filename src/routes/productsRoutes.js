import express from "express";

import { validateItemsQuery } from "../middleware/queryValidator.js";
import { getAllItemsHandler } from "../controllers/productsController.js";

const router = express.Router();

router.get("/", validateItemsQuery, getAllItemsHandler);

export default router;
