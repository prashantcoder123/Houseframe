const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info (decoded.id) to request object
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Token is not valid, authorization denied" });
  }
};

module.exports = authMiddleware;
