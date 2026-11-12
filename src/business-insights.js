function generateInsights(productAnalysis, regionAnalysis, validationResult) {
  console.log("\n===== BUSINESS INSIGHTS =====");

  const topProduct = productAnalysis.topFiveProducts[0];

  console.log(
    "1. Highest Revenue Product:",
    topProduct.productName,
    "- Revenue: ₹" + topProduct.totalRevenue,
  );

  const bestRegion = regionAnalysis.highestRevenueRegion;

  console.log(
    "2. Best Performing Region:",
    bestRegion.regionName,
    "- Revenue: ₹" + bestRegion.totalRevenue,
  );

  const highestQuantity = Math.max(
    ...productAnalysis.productList.map((product) => product.totalQuantity),
  );

  const popularProducts = productAnalysis.productList.filter(
    (product) => product.totalQuantity === highestQuantity,
  );

  console.log(
    "3. Highest Quantity Sold:",
    popularProducts.map((product) => product.productName).join(", "),
    "- Units:",
    highestQuantity,
  );

  console.log(
    "4. Data Quality:",
    validationResult.invalidCount,
    "invalid records found out of",
    validationResult.totalRecords,
  );

  console.log("\n===== BUSINESS RECOMMENDATIONS =====");

  console.log("1. Maintain sufficient stock of the highest-revenue product.");

  console.log("2. Study sales opportunities in lower-revenue regions.");

  console.log("3. Ensure popular products remain available.");

  console.log("4. Improve data-entry checks to reduce invalid records.");
}

module.exports = { generateInsights };
