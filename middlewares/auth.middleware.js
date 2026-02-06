export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token || token !== "secret123") {
    return res.status(403).json({
      message: "Forbidden: Invalid or missing token"
    });
  }

  next();
};
