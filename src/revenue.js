function calculateRevenue(validRows) {
  let totalRevenue = 0;
  let totalQuantity = 0;
  let totalGrossProfit = 0;

  validRows.forEach((row) => {
    const quantity = Number(row.Quantity);
    const price = Number(row.UnitPrice);
    const cost = Number(row.UnitCost);

    const revenue = quantity * price;
    const profit = quantity * (price - cost);

    totalRevenue += revenue;
    totalQuantity += quantity;
    totalGrossProfit += profit;
  });

  const totalValidOrders = validRows.length;

  const averageOrderValue =
    totalValidOrders > 0 ? totalRevenue / totalValidOrders : 0;

  return {
    totalRevenue,
    totalValidOrders,
    averageOrderValue,
    totalQuantity,
    totalGrossProfit,
  };
}

module.exports = { calculateRevenue };
