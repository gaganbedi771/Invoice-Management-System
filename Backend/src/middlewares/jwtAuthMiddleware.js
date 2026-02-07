const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("Token is not present, Invalid request");
    }

    const tokenContent = jwt.verify(token, JWT_SECRET);

    req.user = tokenContent;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
