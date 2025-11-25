import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    const err = new Error("Authentication required");
    err.status = 401;
    return next(err);
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (e) {
    const err = new Error("Invalid or expired token");
    err.status = 401;
    next(err);
  }
}
