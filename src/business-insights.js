function generateInsights(productAnalysis, regionAnalysis, validationResult) {
  const topProduct = productAnalysis.topFiveProducts[0];
  const bestRegion = regionAnalysis.highestRevenueRegion;

  const highestQuantity = Math.max(
    ...productAnalysis.productList.map((product) => product.totalQuantity),
  );

  const popularProducts = productAnalysis.productList.filter(
    (product) => product.totalQuantity === highestQuantity,
  );

  const insights = [
    {
      title: "Highest Revenue Product",
      finding: topProduct.productName,
      revenue: topProduct.totalRevenue,
    },
    {
      title: "Best Performing Region",
      finding: bestRegion.regionName,
      revenue: bestRegion.totalRevenue,
    },
    {
      title: "Highest Quantity Sold",
      products: popularProducts.map((product) => product.productName),
      units: highestQuantity,
    },
    {
      title: "Data Quality",
      invalidRecords: validationResult.invalidCount,
      totalRecords: validationResult.totalRecords,
    },
  ];

  const recommendations = [
    "Maintain sufficient stock of the highest-revenue product.",
    "Study sales opportunities in lower-revenue regions.",
    "Ensure popular products remain available.",
    "Improve data-entry checks to reduce invalid records.",
  ];

  return {
    insights,
    recommendations,
  };
}

module.exports = { generateInsights };
