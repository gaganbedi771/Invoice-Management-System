const InvoiceService = require("../services/invoiceService");
const { getInvoiceData, getSearchQuery } = require("../util/helper");

exports.create = async (req, res) => {
  try {
    const invoiceData = getInvoiceData(req.body);

    const invoice = await InvoiceService.create(invoiceData);

    return res.status(201).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    console.log("Invoice Controller error", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { invoiceNumber } = req.params;
    const invoiceData = getInvoiceData(req.body);

    const invoice = await InvoiceService.update(invoiceNumber, invoiceData);
    res.status(201).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    console.log("Invoice Controller error", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { invoiceNumber } = req.params;

    await InvoiceService.delete(invoiceNumber);

    res.status(201).json({
      success: true,
      data: true,
    });
  } catch (error) {
    console.log("Invoice Controller error", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const { invoiceNumber } = req.params;

    const invoice = await InvoiceService.get(invoiceNumber);
    res.status(201).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    console.log("Invoice Controller error", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const query = getSearchQuery(req.query);

    const invoices = await InvoiceService.getAll(query);

    res.status(201).json({
      success: true,
      data: invoices,
    });
  } catch (error) {
    console.log("Invoice Controller error", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
