import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { getShops, loginShop, registerShop, updateShopPrice } from "../api/endpoints";
import { useAppContext } from "../context/AppContext";

function ShopDashboardPage() {
  const { shopUser, loginShopUser, logoutShopUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [shops, setShops] = useState([]);
  const [authForm, setAuthForm] = useState({ shopName: "", email: "", password: "" });
  const [priceForm, setPriceForm] = useState({ productName: "rice", pricePerKg: "" });

  const fetchShops = async () => {
    const { data } = await getShops();
    setShops(data.shops || []);
  };

  useEffect(() => {
    fetchShops().catch(() => {});
  }, []);

  const onAuthChange = (e) => {
    setAuthForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onPriceChange = (e) => {
    setPriceForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onRegister = async () => {
    setLoading(true);
    try {
      const { data } = await registerShop({ ...authForm, role: "shop" });
      loginShopUser(data.user, data.token);
      alert("Shop registered");
    } catch (error) {
      alert(error.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  const onLogin = async () => {
    setLoading(true);
    try {
      const { data } = await loginShop({ email: authForm.email, password: authForm.password });
      loginShopUser(data.user, data.token);
      alert("Logged in");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const onPriceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateShopPrice({
        productName: priceForm.productName,
        pricePerKg: Number(priceForm.pricePerKg)
      });
      alert("Price updated");
      fetchShops();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid-two">
      <Card title="Shop Login / Register">
        <div className="form-grid">
          <label>
            Shop Name
            <input name="shopName" value={authForm.shopName} onChange={onAuthChange} />
          </label>
          <label>
            Email
            <input type="email" name="email" value={authForm.email} onChange={onAuthChange} />
          </label>
          <label>
            Password
            <input type="password" name="password" value={authForm.password} onChange={onAuthChange} />
          </label>
          <div className="cta-row">
            <button className="btn primary" onClick={onLogin} disabled={loading}>
              Login
            </button>
            <button className="btn secondary" onClick={onRegister} disabled={loading}>
              Register
            </button>
            {shopUser ? (
              <button className="btn ghost" onClick={logoutShopUser}>
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </Card>

      <Card title="Add / Update Product Price">
        {!shopUser ? (
          <p>Login as shop to update prices.</p>
        ) : (
          <form className="form-grid" onSubmit={onPriceSubmit}>
            <label>
              Product
              <select name="productName" value={priceForm.productName} onChange={onPriceChange}>
                <option value="rice">Rice</option>
                <option value="dal">Dal</option>
                <option value="oil">Oil</option>
                <option value="spices">Spices</option>
                <option value="paneer">Paneer</option>
                <option value="chicken">Chicken</option>
              </select>
            </label>
            <label>
              Price per kg
              <input
                type="number"
                min="1"
                name="pricePerKg"
                value={priceForm.pricePerKg}
                onChange={onPriceChange}
                required
              />
            </label>
            <button className="btn primary" type="submit" disabled={loading}>
              Save Price
            </button>
          </form>
        )}
      </Card>

      <Card title="Incoming Orders">
        <p>Connected backend can expose live shop-specific orders here.</p>
      </Card>

      <Card title="Registered Shops">
        <ul className="shop-list">
          {shops.map((shop) => (
            <li key={shop._id}>
              <span>{shop.shopName}</span>
              <small>{shop.prices?.length || 0} products priced</small>
            </li>
          ))}
        </ul>
      </Card>
      {loading ? <Loader /> : null}
    </div>
  );
}

export default ShopDashboardPage;
