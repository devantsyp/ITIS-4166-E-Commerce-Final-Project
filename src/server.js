import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productsRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// YAML STUFF
// For the yaml
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

// APP SETUP
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// ROUTES
app.use("/", authRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.get("/test", (req, res) => res.send("Server is running"));
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.get("/health", (req, res) => res.send("OK"));

// Swagger ui init
const apiDocsPath = path.join(process.cwd(), "src/docs/api.yaml");
const swaggerDocument = YAML.load(apiDocsPath);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ERROR HANDLING
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal Server Error",
  });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}



export default app;
