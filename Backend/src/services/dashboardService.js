const prisma = require("../config/prismaClient");

exports.get = async () => {
  try {
    const totalInvoices = await prisma.invoice.count();

    const totalAmountResult = await prisma.invoice.aggregate({
      _sum: {
        amount: true,
      },
    });

    const invoices = await prisma.invoice.findMany({});

    const InvoiceWithInvoiceNumber = invoices.map((invoice) => ({
      ...invoice,
      invoiceNumber: `INV_${invoice.invoiceNumber}`,
    }));

    return {
      totalInvoices,
      totalAmount: totalAmountResult._sum.amount || 0,
      invoices: InvoiceWithInvoiceNumber,
    };
  } catch (error) {
    console.log("Error in Dashboard service", error);
    throw error;
  }
};
