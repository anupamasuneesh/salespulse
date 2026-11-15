const fs = require("fs");
const csv = require("csv-parser");

function readSalesData() {
  return new Promise((resolve, reject) => {
    const rows = [];

    fs.createReadStream("data/sales.csv")
      .pipe(csv())
      .on("data", (row) => {
        rows.push(row);
      })
      .on("end", () => {
        resolve(rows);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

module.exports = { readSalesData };
