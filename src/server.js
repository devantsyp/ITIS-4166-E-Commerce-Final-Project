import express from "express";
import morgan from "morgan";
import cors from "cors";

//import swaggerUi from "swagger-ui-express";
//import YAML from "yamljs";

import userRoutes from "./routes/userRoutes.js";
import itemsRoutes from "./routes/itemsRoutes.js";

//import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productsRoutes.js";
import authRoutes from "./routes/authRoutes.js";


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
