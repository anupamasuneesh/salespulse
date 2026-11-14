const { validateData } = require("../src/validation");

function test(name, record, expectedValid) {
  const result = validateData([record]);
  const passed = (result.validCount === 1) === expectedValid;

  console.log((passed ? "PASS" : "FAIL") + " - " + name);

  if (!passed) {
    console.log("Result:", result);
  }
}

const normalOrder = {
  OrderID: "TEST001",
  ProductName: "Laptop",
  Region: "North",
  Quantity: "2",
  UnitPrice: "1000",
  UnitCost: "700",
};

test("Normal valid order", normalOrder, true);

test(
  "Zero quantity",
  {
    ...normalOrder,
    OrderID: "TEST002",
    Quantity: "0",
  },
  false,
);

test(
  "Negative unit price",
  {
    ...normalOrder,
    OrderID: "TEST003",
    UnitPrice: "-100",
  },
  false,
);

test(
  "Missing product name",
  {
    ...normalOrder,
    OrderID: "TEST004",
    ProductName: "",
  },
  false,
);

const duplicateOrder = { ...normalOrder, OrderID: "DUP001" };

const duplicateResult = validateData([duplicateOrder, { ...duplicateOrder }]);

console.log(
  (duplicateResult.invalidCount === 2 ? "PASS" : "FAIL") +
    " - Duplicate Order ID",
);

const lossMakingOrder = {
  ...normalOrder,
  OrderID: "TEST006",
  UnitPrice: "500",
  UnitCost: "700",
};

test("Unit cost greater than unit price", lossMakingOrder, true);
