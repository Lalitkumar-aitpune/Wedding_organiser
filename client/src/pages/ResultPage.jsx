import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import MaterialList from "../components/MaterialList";
import ShopComparisonTable from "../components/ShopComparisonTable";
import { useAppContext } from "../context/AppContext";
import { placeOrder } from "../api/endpoints";

function ResultPage() {
  const navigate = useNavigate();
  const { calculationResult } = useAppContext();

  if (!calculationResult) {
    return (
      <Card title="No result found">
        <p>Create an event first to view comparison results.</p>
        <button className="btn primary" onClick={() => navigate("/create-event")}>
          Go to Create Event
        </button>
      </Card>
    );
  }

  const { requiredMaterials, shopComparison, lowestCostShop, eventDetails } = calculationResult;

  const onProceedToOrder = async () => {
    try {
      await placeOrder({
        eventDetails,
        requiredMaterials,
        selectedShopId: lowestCostShop.shopId,
        totalCost: lowestCostShop.totalCost
      });
      alert("Order placed successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <div className="grid-two">
      <Card title="Required Raw Materials">
        <MaterialList materials={requiredMaterials} />
      </Card>

      <Card title="Shop Comparison">
        {lowestCostShop ? (
          <p className="highlight">
            Lowest cost shop: <strong>{lowestCostShop.shopName}</strong> (Rs. {lowestCostShop.totalCost.toFixed(2)})
          </p>
        ) : null}
        <ShopComparisonTable rows={shopComparison} lowestCostShop={lowestCostShop} />
        <button className="btn primary" onClick={onProceedToOrder} disabled={!lowestCostShop}>
          Proceed to Order
        </button>
      </Card>
    </div>
  );
}

export default ResultPage;
