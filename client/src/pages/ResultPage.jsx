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
        <p className="muted-copy">Create an event first to view comparison results.</p>
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
    <div className="page-stack">
      <section className="page-intro compact">
        <span className="section-kicker">Comparison result</span>
        <h2>Your event has been translated into procurement numbers.</h2>
        <p>
          Review material quantities, compare all responding shops, and place the order with the
          most efficient supplier.
        </p>
      </section>

      <div className="result-strip">
        <article>
          <span>Raw materials</span>
          <strong>{requiredMaterials.length}</strong>
        </article>
        <article>
          <span>Compared shops</span>
          <strong>{shopComparison.length}</strong>
        </article>
        <article>
          <span>Best estimate</span>
          <strong>{lowestCostShop ? `Rs. ${lowestCostShop.totalCost.toFixed(2)}` : "Pending"}</strong>
        </article>
      </div>

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
    </div>
  );
}

export default ResultPage;
