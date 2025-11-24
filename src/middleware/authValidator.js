import jwt from "jsonwebtoken";

// req.user = decodedUser;
// next();

export const protect = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Missing token" });

  const token = header.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // { id, role }
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
