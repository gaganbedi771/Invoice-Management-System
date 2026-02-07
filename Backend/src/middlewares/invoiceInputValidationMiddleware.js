exports.validateInvoiceInput = (req, res, next) => {
  try {
    const { invoiceNumber, customerName, amount, date, status } = req.body;

    if (!customerName) {
      throw new Error("Customer name is required");
    }

    if (!amount || typeof amount !== "number") {
      throw new Error("Amount required in Number");
    }

    if (!date) {
      throw new Error("Date is required");
    }

    if (!status || (status !== "PAID" && status !== "UNPAID")) {
      throw new Error(`Status is required in "PAID" or "UNPAID"`);
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
