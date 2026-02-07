const prisma = require("../config/prismaClient");

const { getFilterObj } = require("../util/helper");

exports.create = async (data) => {
  try {
    const invoice = await prisma.invoice.create({
      data: {
        ...data,
        date: new Date(data.date),
      },
    });

    return {
      ...invoice,
      invoiceNumber: `INV_${invoice.invoiceNumber}`,
    };
  } catch (error) {
    console.log("Error in Invoice service", error);
    throw error;
  }
};

exports.update = async (invoiceNumber, data) => {
  try {
    const id = parseInt(invoiceNumber.replace("INV_", ""));

    const invoice = await prisma.invoice.update({
      where: {
        invoiceNumber: id,
      },
      data: {
        ...data,
        date: new Date(data.date),
      },
    });

    return {
      ...invoice,
      invoiceNumber: `INV_${invoice.invoiceNumber}`,
    };
  } catch (error) {
    console.log("Error in Invoice service", error);
    throw error;
  }
};

exports.delete = async (invoiceNumber) => {
  try {
    const id = parseInt(invoiceNumber.replace("INV_", ""));

    const invoice = await prisma.invoice.delete({
      where: {
        invoiceNumber: id,
      },
    });

    return true;
  } catch (error) {
    console.log("Error in Invoice service", error);
    throw error;
  }
};

exports.get = async (invoiceNumber) => {
  try {
    const id = parseInt(invoiceNumber.replace("INV_", ""));

    const invoice = await prisma.invoice.findUnique({
      where: {
        invoiceNumber: id,
      },
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    return {
      ...invoice,
      invoiceNumber: `INV_${invoice.invoiceNumber}`,
    };
  } catch (error) {
    console.log("Error in Invoice service", error);
    throw error;
  }
};

exports.getAll = async (query) => {
  try {
    const filter = getFilterObj(query);

    const invoices = await prisma.invoice.findMany({ where: filter });

    const invoicesWithInvoiceNumber = invoices.map((invoice) => {
      return { ...invoice, invoiceNumber: `INV_${invoice.invoiceNumber}` };
    });

    return invoicesWithInvoiceNumber;
  } catch (error) {
    console.log("Error in Invoice service", error);
    throw error;
  }
};
