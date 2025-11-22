const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const userRoutes = require("./users");
const productRoutes = require("./products");
const categoryRoutes = require("./categories");
const orderRoutes = require("./orders");

// Mount routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
