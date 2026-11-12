// Step 1: Import the required libraries
const fs = require("fs");
const csv = require("csv-parser");

// Step 2: Create an empty array
const rows = [];

// Step 3: Read the CSV file
fs.createReadStream("data/sales.csv")

  // Step 4: Convert CSV data into JavaScript objects
  .pipe(csv())

  // Step 5: Store each record
  .on("data", (row) => {
    rows.push(row);
  })

  // Step 6: Display the results after reading
  .on("end", () => {
    console.log("CSV file successfully read!");

    console.log("Total records:", rows.length);

    console.log("\nFirst 5 sales records:");

    console.log(rows.slice(0, 5));
  })

  // Step 7: Handle errors
  .on("error", (error) => {
    console.log("Error:", error.message);
  });
