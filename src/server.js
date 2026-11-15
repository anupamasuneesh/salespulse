const express = require("express");

const { readSalesData } = require("./read-data");
const { validateData } = require("./validation");
const { calculateRevenue } = require("./revenue");
const { analyzeProducts } = require("./product-analysis");
const { analyzeRegions } = require("./region-analysis");
const { generateInsights } = require("./business-insights");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    project: "SalesPulse",
    message: "SalesPulse API is running successfully",
    status: "Running",
  });
});

app.get("/api/sales", async (req, res) => {
  try {
    const rows = await readSalesData();

    const result = validateData(rows);
    const revenue = calculateRevenue(result.validRows);
    const productAnalysis = analyzeProducts(result.validRows);
    const regionAnalysis = analyzeRegions(result.validRows);
    const insights = generateInsights(productAnalysis, regionAnalysis, result);

    res.json({
      validation: result,
      revenue,
      products: productAnalysis,
      regions: regionAnalysis,
      insights,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("SalesPulse API running at http://localhost:" + PORT);
});
