import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "User Login", to: "/user-auth" },
  { label: "Create Event", to: "/create-event" },
  { label: "Result", to: "/result" },
  { label: "Shop Dashboard", to: "/shop-dashboard" },
  { label: "Admin Login", to: "/admin-login" },
  { label: "Admin", to: "/admin" }
];

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-kicker">Wedding Ops Studio</span>
          <h1>Wedding Raw Material Aggregator</h1>
        </div>
        <nav className="topnav">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={location.pathname === item.to ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="container">{children}</main>
    </div>
  );
}

export default Layout;
