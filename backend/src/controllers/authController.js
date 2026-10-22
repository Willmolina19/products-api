
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      error: "Usuario y contraseña son obligatorios",
    });
  }

  if (
    username !== process.env.LOGIN_USER ||
    password !== process.env.LOGIN_PASSWORD
  ) {
    return res.status(401).json({
      error: "Credenciales incorrectas",
    });
  }

  const token = jwt.sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.json({ token });
};

module.exports = { login };
