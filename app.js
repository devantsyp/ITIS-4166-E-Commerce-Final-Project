// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { errorHandler } from "./middleware/errorHandler.js";

// For the yaml
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// Route files
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Swagger ui init
const swaggerDocument = YAML.load("./src/docs/api.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check (good for Render)
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running successfully" });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.get("/test", (req, res) => res.send("Server is running"));

// Catch-all for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use(errorHandler);

export default app;
