import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { loginUser, registerUser } from "../api/endpoints";
import { useAppContext } from "../context/AppContext";

const INITIAL_LOGIN = { email: "", password: "" };
const INITIAL_REGISTER = { name: "", email: "", password: "" };

function UserAuthPage() {
  const navigate = useNavigate();
  const { userAccount, loginUserAccount, logoutUserAccount } = useAppContext();
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(INITIAL_LOGIN);
  const [registerForm, setRegisterForm] = useState(INITIAL_REGISTER);

  const onLoginChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onRegisterChange = (e) => {
    setRegisterForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser(loginForm);
      if (data.user?.role !== "user") {
        throw new Error("This account is not a customer account");
      }
      loginUserAccount(data.user, data.token);
      navigate("/create-event");
    } catch (error) {
      alert(error.response?.data?.message || error.message || "User login failed");
    } finally {
      setLoading(false);
    }
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await registerUser({ ...registerForm, role: "user" });
      loginUserAccount(data.user, data.token);
      navigate("/create-event");
    } catch (error) {
      alert(error.response?.data?.message || "User registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-stack">
      <section className="page-intro compact">
        <span className="section-kicker">Customer access</span>
        <h2>Sign in as a wedding planner or event buyer.</h2>
        <p>
          Customer accounts are for creating events, comparing shops, and placing orders. Shop and admin
          accounts continue to use their own dedicated login flows.
        </p>
      </section>

      <div className="grid-two auth-grid">
        <Card title="Customer Access">
          <div className="cta-row auth-toggle">
            <button
              className={`btn ${mode === "login" ? "primary" : "secondary"}`}
              onClick={() => setMode("login")}
              type="button"
            >
              Login
            </button>
            <button
              className={`btn ${mode === "register" ? "primary" : "secondary"}`}
              onClick={() => setMode("register")}
              type="button"
            >
              Register
            </button>
          </div>

          {mode === "login" ? (
            <form className="form-grid" onSubmit={submitLogin}>
              <label>
                Email
                <input type="email" name="email" value={loginForm.email} onChange={onLoginChange} required />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={onLoginChange}
                  required
                />
              </label>
              <button className="btn primary" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Login as Customer"}
              </button>
            </form>
          ) : (
            <form className="form-grid" onSubmit={submitRegister}>
              <label>
                Full Name
                <input name="name" value={registerForm.name} onChange={onRegisterChange} required />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={registerForm.email}
                  onChange={onRegisterChange}
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  value={registerForm.password}
                  onChange={onRegisterChange}
                  required
                />
              </label>
              <button className="btn primary" type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Register as Customer"}
              </button>
            </form>
          )}
        </Card>

        <Card title="Session Status">
          {userAccount ? (
            <div className="status-panel">
              <p>
                Logged in as <strong>{userAccount.email}</strong>
              </p>
              <p className="muted-copy">
                You can now build event briefs and place orders with your customer identity attached.
              </p>
              <div className="cta-row">
                <Link to="/create-event" className="btn primary">
                  Create Event
                </Link>
                <button className="btn ghost" onClick={logoutUserAccount} type="button">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="status-panel">
              <p className="muted-copy">
                No customer session yet. Register once, then use the same login for future events and
                orders.
              </p>
              <p className="muted-copy">
                Need supplier access instead? Visit <Link to="/shop-dashboard">Shop Dashboard</Link>.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default UserAuthPage;
