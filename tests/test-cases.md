| Test ID | Test Scenario     | Input                | Expected Result                      |
| ------- | ----------------- | -------------------- | ------------------------------------ |
| TC01    | Valid order       | Normal sales record  | Accept the record                    |
| TC02    | Zero quantity     | Quantity = 0         | Reject the record                    |
| TC03    | Negative price    | UnitPrice = -500     | Reject the record                    |
| TC04    | Missing product   | ProductName is empty | Reject the record                    |
| TC05    | Duplicate order   | Same OrderID twice   | Reject duplicate records             |
| TC06    | Loss-making order | UnitCost > UnitPrice | Accept and calculate negative profit |
| TC07    | No valid orders   | All records invalid  | AOV should be 0, no division error   |
