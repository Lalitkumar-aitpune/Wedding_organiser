import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { loginShop } from "../api/endpoints";
import { useAppContext } from "../context/AppContext";

function AdminLoginPage() {
  const navigate = useNavigate();
  const { loginAdminUser } = useAppContext();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginShop(form);
      if (data.user?.role !== "admin") {
        throw new Error("This account is not an admin");
      }
      loginAdminUser(data.user, data.token);
      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Admin Login">
      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={onChange} required />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={onChange} required />
        </label>
        <button className="btn primary" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login as Admin"}
        </button>
      </form>
    </Card>
  );
}

export default AdminLoginPage;
