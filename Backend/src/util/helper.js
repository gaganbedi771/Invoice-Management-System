exports.getInvoiceData = (data) => {
  return {
    customerName: data.customerName,
    amount: data.amount,
    date: data.date,
    status: data.status,
  };
};

exports.getSearchQuery = (data) => {
  return {
    status: data.status,
    startDate: data.startDate,
    endDate: data.endDate,
    search: data.search,
  };
};

exports.getFilterObj = (data) => {
  const filter = {};

  if (data.status) {
    filter.status = data.status;
  }

  if (data.startDate || data.endDate) {
    filter.date = {};

    if (data.startDate) {
      filter.date.gte = new Date(data.startDate);
    }

    if (data.endDate) {
      filter.date.lte = new Date(data.endDate);
    }
  }

  if (data.search) {
    if (data.search.startsWith("INV_")) {
      const invoiceNumber = parseInt(data.search.replace("INV_", ""));
      if (!isNaN(invoiceNumber)) {
        filter.invoiceNumber = invoiceNumber;
      }
    } else {
      filter.customerName = {
        contains: data.search,
        mode: "insensitive",
      };
    }
  }

  return filter;
};
