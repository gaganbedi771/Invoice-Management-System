const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/jwtAuthMiddleware");

const InvoiceController = require("../controllers/invoiceController");
const {
  validateInvoiceInput,
} = require("../middlewares/invoiceInputValidationMiddleware");

router.post("/", verifyToken, validateInvoiceInput, InvoiceController.create);
router.put(
  "/:invoiceNumber",
  verifyToken,
  validateInvoiceInput,
  InvoiceController.update,
);
router.delete("/:invoiceNumber", verifyToken, InvoiceController.delete);
router.get("/", verifyToken, InvoiceController.getAll);
router.get("/:invoiceNumber", verifyToken, InvoiceController.get);


module.exports = router;
