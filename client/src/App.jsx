import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CreateEventPage from "./pages/CreateEventPage";
import ResultPage from "./pages/ResultPage";
import ShopDashboardPage from "./pages/ShopDashboardPage";
import AdminPanelPage from "./pages/AdminPanelPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/shop-dashboard" element={<ShopDashboardPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
