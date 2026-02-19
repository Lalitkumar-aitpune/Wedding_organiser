import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Create Event", to: "/create-event" },
  { label: "Result", to: "/result" },
  { label: "Shop Dashboard", to: "/shop-dashboard" },
  { label: "Admin", to: "/admin" }
];

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>Wedding Raw Material Aggregator</h1>
        <nav>
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
