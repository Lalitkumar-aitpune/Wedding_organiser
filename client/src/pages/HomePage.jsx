import { Link } from "react-router-dom";
import Card from "../components/Card";

function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="section-kicker">Procurement, styled for wedding scale</span>
          <h2>Plan menus, compare shops, and control cost without spreadsheet chaos.</h2>
          <p>
            Turn guest counts into exact raw-material demand, compare live vendor pricing, and keep
            your event sourcing organized from estimate to order.
          </p>
          <div className="cta-row">
            <Link to="/create-event" className="btn primary">
              Start Event Planning
            </Link>
            <Link to="/shop-dashboard" className="btn secondary">
              Enter Shop Dashboard
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-badge">Live Wedding Stack</div>
          <div className="hero-metrics">
            <article>
              <strong>430</strong>
              <span>guest event estimate</span>
            </article>
            <article>
              <strong>5</strong>
              <span>dish ratio templates</span>
            </article>
            <article>
              <strong>1 click</strong>
              <span>lowest-cost shop shortlist</span>
            </article>
          </div>
        </div>
      </section>

      <div className="feature-grid">
        <Card title="Event Planner Flow">
          <p className="muted-copy">
            Build an event brief with menu, headcount, date, and address. We convert it into a
            procurement-ready list automatically.
          </p>
        </Card>
        <Card title="Smart Comparison">
          <p className="muted-copy">
            Every participating shop is scored on total estimated cost so the cheapest viable vendor
            is clear immediately.
          </p>
        </Card>
        <Card title="Admin Control">
          <p className="muted-copy">
            Approve shops, manage dish ratios, and monitor order status from one place without
            leaving the platform.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
