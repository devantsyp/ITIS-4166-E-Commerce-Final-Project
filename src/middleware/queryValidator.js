import { param, query, body, oneOf } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

const allowedSortFields = ["id", "title", "createdAt"];
const allowedSortOrders = ["asc", "desc"];
export const validateItemsQuery = [
  query("search").optional().isString().withMessage("search must be a string"),

  query("sortBy")
    .optional()
    .isIn(allowedSortFields)
    .withMessage(`sortBy must be one of: ${allowedSortFields.join(", ")}`),

  query("sortOrder")
    .optional()
    .isIn(allowedSortOrders)
    .withMessage(`sortOrder must be one of: ${allowedSortOrders.join(", ")}`),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit must be an integer between 1 and 100"),

  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("offset must be 0 or a positive integer"),

  handleValidationErrors,
];

export const validateProductId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Product ID must be a positive integer"),
  handleValidationErrors,
];
