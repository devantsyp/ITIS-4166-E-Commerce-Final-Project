export function ownership(getUserId) {
  return (req, res, next) => {
    const ownerId = getUserId(req);

    if (req.user.role === "ADMIN" || req.user.id === ownerId) {
      return next();
    }
    return res.status(403).json({ message: "Forbidden" });
  };
}
