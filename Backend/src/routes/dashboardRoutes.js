const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/jwtAuthMiddleware");

const DasboardController = require("../controllers/dashboardControllers");

router.get("/", verifyToken, DasboardController.get);

module.exports = router;
