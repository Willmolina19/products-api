
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Token requerido",
    });
  }

  const token = authorization.slice(7);

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({
      error: "Token inválido o expirado",
    });
  }
};

module.exports = verifyToken;
