// middleware/errorHandler.js

export const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  // If the error already has a status (e.g., thrown manually)
  const statusCode = err.statusCode || err.status || 500;

  // Default message
  const message = err.message || "Internal Server Error";

  // Handle Prisma known errors
  if (err.code === "P2002") {
    // Unique constraint violation
    return res.status(409).json({
      error: "A record with this value already exists",
      target: err.meta?.target,
    });
  }

  if (err.code === "P2025") {
    // Record not found
    return res.status(404).json({
      error: "Record not found",
    });
  }

  if (process.env.NODE_ENV === "development") {
    // Show full details during dev
    return res.status(statusCode).json({
      error: message,
      details: err,
    });
  }

  // In production, hide stack traces
  return res.status(statusCode).json({
    error: message,
  });
};
