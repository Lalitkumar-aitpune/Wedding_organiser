import { Link } from "react-router-dom";
import Card from "../components/Card";

function HomePage() {
  return (
    <Card title="Plan Better Wedding Procurement">
      <p>
        Calculate exact raw material needs from your menu, compare multiple shop quotes,
        and place orders from the lowest-cost vendor.
      </p>
      <div className="cta-row">
        <Link to="/create-event" className="btn primary">
          Create New Event
        </Link>
        <Link to="/shop-dashboard" className="btn secondary">
          Shop Dashboard
        </Link>
      </div>
    </Card>
  );
}

export default HomePage;
