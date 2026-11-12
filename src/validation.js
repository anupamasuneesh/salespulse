function validateData(rows) {
  const validRows = [];
  const invalidRows = [];

  // Check duplicate Order IDs
  const orderIdCounts = {};

  rows.forEach((row) => {
    const id = String(row.OrderID || "").trim();

    if (id !== "") {
      orderIdCounts[id] = (orderIdCounts[id] || 0) + 1;
    }
  });

  // Validate each record
  rows.forEach((row, index) => {
    const reasons = [];

    const orderId = String(row.OrderID || "").trim();
    const product = String(row.ProductName || "").trim();
    const region = String(row.Region || "").trim();

    const quantity = Number(row.Quantity);
    const price = Number(row.UnitPrice);
    const cost = Number(row.UnitCost);

    if (!orderId) {
      reasons.push("Missing Order ID");
    }

    if (orderId && orderIdCounts[orderId] > 1) {
      reasons.push("Duplicate Order ID");
    }

    if (row.Quantity === "" || !Number.isFinite(quantity) || quantity <= 0) {
      reasons.push("Invalid quantity");
    }

    if (row.UnitPrice === "" || !Number.isFinite(price) || price <= 0) {
      reasons.push("Invalid unit price");
    }

    if (row.UnitCost === "" || !Number.isFinite(cost) || cost < 0) {
      reasons.push("Invalid unit cost");
    }

    if (!product) {
      reasons.push("Missing product name");
    }

    if (!region) {
      reasons.push("Missing region");
    }

    if (reasons.length > 0) {
      invalidRows.push({
        rowNumber: index + 2,
        orderId: orderId || "Missing",
        reasons: reasons,
      });
    } else {
      validRows.push(row);
    }
  });

  return {
    totalRecords: rows.length,
    validCount: validRows.length,
    invalidCount: invalidRows.length,
    validRows,
    invalidRows,
  };
}

module.exports = { validateData };

// // SalesPulse data validation module
