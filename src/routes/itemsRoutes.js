import express from "express";

import { validateItemsQuery } from "../middleware/itemsValidators.js";
import { getAllItemsHandler } from "../controllers/itemsController.js";

const router = express.Router();

router.get("/", validateItemsQuery, getAllItemsHandler);

export default router;
