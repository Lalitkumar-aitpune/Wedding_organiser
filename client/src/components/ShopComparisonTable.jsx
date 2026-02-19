function ShopComparisonTable({ rows = [], lowestCostShop }) {
  if (!rows.length) return <p>No comparison data available.</p>;

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Shop Name</th>
            <th>Total Cost</th>
            <th>Items Priced</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isLowest = lowestCostShop && lowestCostShop.shopId === row.shopId;
            return (
              <tr key={row.shopId} className={isLowest ? "lowest" : ""}>
                <td>{row.shopName}</td>
                <td>Rs. {row.totalCost.toFixed(2)}</td>
                <td>{row.itemsPriced}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ShopComparisonTable;
