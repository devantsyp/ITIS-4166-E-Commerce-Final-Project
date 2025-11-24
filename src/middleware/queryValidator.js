import prisma from "../config/db.js";
import { param, query, body, oneOf } from "express-validator";
import { handleValidationErrors } from "./handleValidationErrors.js";

const allowedSortFields = ["id", "name", "price", "createdAt"];
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

export const validateCreateUser = [
  body("name")
    .notEmpty()
    .withMessage("Name field is required")
    .isLength({ min: 3 })
    .withMessage("Name must be 3 characters or longer"),
  body("email")
    .notEmpty()
    .withMessage("Email field is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password field is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character"),

  handleValidationErrors,
];

export const validateCreateProduct = [
  body("name")
    .notEmpty()
    .withMessage("Name field is required")
    .isLength({ min: 3 })
    .withMessage("Name must be 3 characters or longer"),

  body("price")
    .notEmpty()
    .withMessage("Price field is required")
    .isDecimal()
    .withMessage("Price must be a decimal"),

  body("categoryId")
    .notEmpty()
    .withMessage("CategoryId field is required")
    .isInt()
    .withMessage("categoryId must be an integer")
    // custom function for checking if categoryId exists in the DB
    .custom(async (value) => {
      const id = Number(value);
      const category = await prisma.category.findUnique({
        where: { id },
      });

      if (!category) {
        // cause validation to fail
        throw new Error("categoryId does not refer to an existing category");
      }

      return true;
    }),

  body("description")
    .optional()
    .isLength({ min: 3, max: 150 })
    .withMessage(
      "Product description must be between 3 and 150 characters long"
    ),

  handleValidationErrors,
];
