function analyzeRegions(validRows) {
  const regions = {};

  validRows.forEach((row) => {
    const regionName = row.Region;
    const quantity = Number(row.Quantity);
    const price = Number(row.UnitPrice);
    const cost = Number(row.UnitCost);

    const revenue = quantity * price;
    const profit = quantity * (price - cost);

    if (!regions[regionName]) {
      regions[regionName] = {
        regionName: regionName,
        totalRevenue: 0,
        totalGrossProfit: 0,
      };
    }

    regions[regionName].totalRevenue += revenue;
    regions[regionName].totalGrossProfit += profit;
  });

  const regionList = Object.values(regions);

  regionList.sort((a, b) => b.totalRevenue - a.totalRevenue);

  return {
    regionList,
    highestRevenueRegion: regionList[0],
    lowestRevenueRegion: regionList[regionList.length - 1],
  };
}

module.exports = { analyzeRegions };
