function analyzeProducts(validRows) {
  const products = {};

  validRows.forEach((row) => {
    const productName = row.ProductName;
    const quantity = Number(row.Quantity);
    const price = Number(row.UnitPrice);

    const revenue = quantity * price;

    if (!products[productName]) {
      products[productName] = {
        productName: productName,
        totalRevenue: 0,
        totalQuantity: 0,
      };
    }

    products[productName].totalRevenue += revenue;
    products[productName].totalQuantity += quantity;
  });

  const productList = Object.values(products);

  productList.sort((a, b) => b.totalRevenue - a.totalRevenue);

  const highestQuantityProduct =
    [...productList].sort((a, b) => b.totalQuantity - a.totalQuantity)[0] ||
    null;

  return {
    productList,
    topFiveProducts: productList.slice(0, 5),
    highestQuantityProduct,
  };
}

module.exports = { analyzeProducts };
