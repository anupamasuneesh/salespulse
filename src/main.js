const fs = require("fs");
const csv = require("csv-parser");

const { validateData } = require("./validation");
const { calculateRevenue } = require("./revenue");
const { analyzeProducts } = require("./product-analysis");
const { analyzeRegions } = require("./region-analysis");
const { generateInsights } = require("./business-insights");

const rows = [];

fs.createReadStream("data/sales.csv")
  .pipe(csv())
  .on("data", (row) => {
    rows.push(row);
  })
  .on("end", () => {
    const result = validateData(rows);
    const revenue = calculateRevenue(result.validRows);
    const productAnalysis = analyzeProducts(result.validRows);
    const regionAnalysis = analyzeRegions(result.validRows);
    console.log("\n===== SALESPULSE DATA VALIDATION =====");

    console.log("Total Records:", result.totalRecords);
    console.log("Valid Records:", result.validCount);
    console.log("Invalid Records:", result.invalidCount);

    console.log("\n===== INVALID RECORDS =====");

    result.invalidRows.forEach((record) => {
      console.log("\nOrder ID:", record.orderId);
      console.log("Row Number:", record.rowNumber);
      console.log("Reason:", record.reasons.join(", "));
    });

    console.log("\n===== REVENUE METRICS =====");

    console.log("Total Revenue: ₹", revenue.totalRevenue.toFixed(2));

    console.log("Total Valid Orders:", revenue.totalValidOrders);

    console.log("Average Order Value: ₹", revenue.averageOrderValue.toFixed(2));

    console.log("Total Quantity Sold:", revenue.totalQuantity);

    console.log(
      "Estimated Gross Profit: ₹",
      revenue.totalGrossProfit.toFixed(2),
    );
    console.log("\n===== PRODUCT ANALYSIS =====");

    console.log("\nTop 5 Products by Revenue:");

    productAnalysis.topFiveProducts.forEach((product, index) => {
      console.log(
        `${index + 1}. ${product.productName} - Revenue: ₹${product.totalRevenue} - Quantity: ${product.totalQuantity}`,
      );
    });

    console.log("\nProduct with Highest Quantity Sold:");

    const highestQuantityProduct = [...productAnalysis.productList].sort(
      (a, b) => b.totalQuantity - a.totalQuantity,
    )[0];

    console.log(
      highestQuantityProduct.productName,
      "- Quantity:",
      highestQuantityProduct.totalQuantity,
    );
    console.log("\n===== REGIONAL ANALYSIS =====");

    regionAnalysis.regionList.forEach((region) => {
      console.log("\nRegion:", region.regionName);
      console.log("Revenue: ₹", region.totalRevenue.toFixed(2));
      console.log("Gross Profit: ₹", region.totalGrossProfit.toFixed(2));
    });

    console.log("\nHighest Revenue Region:");
    console.log(
      regionAnalysis.highestRevenueRegion.regionName,
      "- ₹",
      regionAnalysis.highestRevenueRegion.totalRevenue.toFixed(2),
    );

    console.log("\nLowest Revenue Region:");
    console.log(
      regionAnalysis.lowestRevenueRegion.regionName,
      "- ₹",
      regionAnalysis.lowestRevenueRegion.totalRevenue.toFixed(2),
    );
    generateInsights(productAnalysis, regionAnalysis, result);
    console.log("\n===== VALIDATION COMPLETED =====");
  })
  .on("error", (error) => {
    console.log("Error:", error.message);
  });
