import { useEffect, useState } from "react";
import Card from "../components/Card";
import {
  createAdminDishRatio,
  deleteAdminDishRatio,
  getAdminDishRatios,
  getAdminOrders,
  getAdminShops,
  updateAdminDishRatio,
  updateAdminOrderStatus,
  updateAdminShopStatus
} from "../api/endpoints";
import { useAppContext } from "../context/AppContext";

const ORDER_STATUSES = ["pending", "confirmed", "processing", "completed", "cancelled"];
const EMPTY_FORM = {
  dishName: "",
  ingredients: [{ product: "", quantityKgPerPerson: "" }]
};

function AdminPanelPage() {
  const { adminUser, logoutAdminUser } = useAppContext();
  const [tab, setTab] = useState("shops");
  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dishRatios, setDishRatios] = useState([]);
  const [editingId, setEditingId] = useState("");
  const [dishForm, setDishForm] = useState(EMPTY_FORM);

  const loadShops = async () => {
    const { data } = await getAdminShops();
    setShops(data.shops || []);
  };

  const loadOrders = async () => {
    const { data } = await getAdminOrders();
    setOrders(data.orders || []);
  };

  const loadDishRatios = async () => {
    const { data } = await getAdminDishRatios();
    setDishRatios(data.dishRatios || []);
  };

  const refreshAll = async () => {
    setLoading(true);
    try {
      await Promise.all([loadShops(), loadOrders(), loadDishRatios()]);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll().catch(() => {});
  }, []);

  const updateShop = async (shopId, payload) => {
    try {
      await updateAdminShopStatus(shopId, payload);
      await loadShops();
    } catch (error) {
      alert(error.response?.data?.message || "Shop update failed");
    }
  };

  const onOrderStatusChange = async (orderId, status) => {
    try {
      await updateAdminOrderStatus(orderId, { status });
      await loadOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Order update failed");
    }
  };

  const onIngredientChange = (index, key, value) => {
    setDishForm((prev) => {
      const next = [...prev.ingredients];
      next[index] = { ...next[index], [key]: value };
      return { ...prev, ingredients: next };
    });
  };

  const addIngredientRow = () => {
    setDishForm((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { product: "", quantityKgPerPerson: "" }]
    }));
  };

  const removeIngredientRow = (index) => {
    setDishForm((prev) => {
      if (prev.ingredients.length <= 1) return prev;
      return {
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index)
      };
    });
  };

  const resetDishForm = () => {
    setEditingId("");
    setDishForm(EMPTY_FORM);
  };

  const onEditDish = (dish) => {
    setEditingId(dish._id);
    setDishForm({
      dishName: dish.dishName,
      ingredients: dish.ingredients.map((ing) => ({
        product: ing.product,
        quantityKgPerPerson: String(ing.quantityKgPerPerson)
      }))
    });
    setTab("dish-ratios");
  };

  const onDeleteDish = async (dishId) => {
    if (!window.confirm("Delete this dish ratio?")) return;
    try {
      await deleteAdminDishRatio(dishId);
      await loadDishRatios();
      if (editingId === dishId) resetDishForm();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const onDishSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      dishName: dishForm.dishName.trim(),
      ingredients: dishForm.ingredients
        .map((ing) => ({
          product: ing.product.trim().toLowerCase(),
          quantityKgPerPerson: Number(ing.quantityKgPerPerson)
        }))
        .filter((ing) => ing.product)
    };

    if (!payload.dishName || !payload.ingredients.length) {
      alert("Dish name and at least one ingredient are required");
      return;
    }

    try {
      if (editingId) {
        await updateAdminDishRatio(editingId, payload);
      } else {
        await createAdminDishRatio(payload);
      }
      await loadDishRatios();
      resetDishForm();
    } catch (error) {
      alert(error.response?.data?.message || "Dish ratio save failed");
    }
  };

  return (
    <div>
      <Card title="Admin Control Center">
        <p>
          Logged in as <strong>{adminUser?.email}</strong>
        </p>
        <div className="cta-row">
          <button className={`btn ${tab === "shops" ? "primary" : "secondary"}`} onClick={() => setTab("shops")}>
            Shop Approvals
          </button>
          <button className={`btn ${tab === "orders" ? "primary" : "secondary"}`} onClick={() => setTab("orders")}>
            Order Management
          </button>
          <button
            className={`btn ${tab === "dish-ratios" ? "primary" : "secondary"}`}
            onClick={() => setTab("dish-ratios")}
          >
            Dish Ratios
          </button>
          <button className="btn ghost" onClick={refreshAll}>
            Refresh
          </button>
          <button className="btn ghost" onClick={logoutAdminUser}>
            Logout
          </button>
        </div>
      </Card>

      {tab === "shops" ? (
        <Card title="Approve / Deactivate Shops">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Shop</th>
                  <th>Owner</th>
                  <th>Approval</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {shops.map((shop) => (
                  <tr key={shop._id}>
                    <td>{shop.shopName}</td>
                    <td>{shop.owner?.email || "-"}</td>
                    <td>{shop.isApproved ? "Approved" : "Pending"}</td>
                    <td>{shop.isActive ? "Yes" : "No"}</td>
                    <td>
                      <div className="action-inline">
                        <button className="btn secondary" onClick={() => updateShop(shop._id, { isApproved: true })}>
                          Approve
                        </button>
                        <button className="btn ghost" onClick={() => updateShop(shop._id, { isApproved: false })}>
                          Revoke
                        </button>
                        <button className="btn ghost" onClick={() => updateShop(shop._id, { isActive: !shop.isActive })}>
                          {shop.isActive ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {tab === "orders" ? (
        <Card title="View & Update Orders">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Shop</th>
                  <th>Guests</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.slice(-8)}</td>
                    <td>{order.shop?.shopName || "-"}</td>
                    <td>{order.eventDetails?.numberOfGuests || "-"}</td>
                    <td>Rs. {(order.totalCost || 0).toFixed(2)}</td>
                    <td>
                      <select
                        value={order.status || "pending"}
                        onChange={(e) => onOrderStatusChange(order._id, e.target.value)}
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {tab === "dish-ratios" ? (
        <div className="grid-two">
          <Card title={editingId ? "Edit Dish Ratio" : "Create Dish Ratio"}>
            <form className="form-grid" onSubmit={onDishSubmit}>
              <label>
                Dish Name
                <input
                  name="dishName"
                  value={dishForm.dishName}
                  onChange={(e) => setDishForm((prev) => ({ ...prev, dishName: e.target.value }))}
                  required
                />
              </label>

              <strong>Ingredients (kg per person)</strong>
              {dishForm.ingredients.map((ing, index) => (
                <div key={`ingredient-${index}`} className="ingredient-row">
                  <input
                    placeholder="product"
                    value={ing.product}
                    onChange={(e) => onIngredientChange(index, "product", e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.001"
                    placeholder="0.050"
                    value={ing.quantityKgPerPerson}
                    onChange={(e) => onIngredientChange(index, "quantityKgPerPerson", e.target.value)}
                    required
                  />
                  <button type="button" className="btn ghost" onClick={() => removeIngredientRow(index)}>
                    Remove
                  </button>
                </div>
              ))}

              <div className="cta-row">
                <button type="button" className="btn secondary" onClick={addIngredientRow}>
                  Add Ingredient
                </button>
                <button type="submit" className="btn primary">
                  {editingId ? "Update Ratio" : "Create Ratio"}
                </button>
                {editingId ? (
                  <button type="button" className="btn ghost" onClick={resetDishForm}>
                    Cancel Edit
                  </button>
                ) : null}
              </div>
            </form>
          </Card>

          <Card title="Existing Dish Ratios">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Dish</th>
                    <th>Ingredients</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dishRatios.map((dish) => (
                    <tr key={dish._id}>
                      <td>{dish.dishName}</td>
                      <td>
                        {dish.ingredients
                          .map((ing) => `${ing.product}: ${Number(ing.quantityKgPerPerson).toFixed(3)}kg`)
                          .join(", ")}
                      </td>
                      <td>
                        <div className="action-inline">
                          <button className="btn secondary" onClick={() => onEditDish(dish)}>
                            Edit
                          </button>
                          <button className="btn ghost" onClick={() => onDeleteDish(dish._id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : null}

      {loading ? <p className="loading">Loading admin data...</p> : null}
    </div>
  );
}

export default AdminPanelPage;
