import Card from "../components/Card";

function AdminPanelPage() {
  return (
    <Card title="Admin Panel">
      <p>Use this area to manage dish ratios, monitor all orders, and validate shop data quality.</p>
      <ul>
        <li>Dish ratio governance (create/update standards).</li>
        <li>Order analytics and dispute handling.</li>
        <li>Shop onboarding and compliance review.</li>
      </ul>
    </Card>
  );
}

export default AdminPanelPage;
