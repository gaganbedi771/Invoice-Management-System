const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");
const {validateAuthInput} = require("../middlewares/authInputValidationMiddleware");

router.post("/signup", validateAuthInput , AuthController.signup);
router.post("/signin", validateAuthInput , AuthController.signin);

module.exports = router;
