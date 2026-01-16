import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export function DashboardLayout() {
  const { role } = useAuth();

  return (
    <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-[260px_1fr]">
      <aside className="bg-base-200 p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">
            Smart E-Commerce
          </Link>
        </div>

        <div className="divider" />

        <nav className="menu">
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>

          {role === "admin" ? (
            <>
              <li>
                <NavLink to="/dashboard/admin/products">Manage Products</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/products/new">Add Product</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/orders">Manage Orders</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/messages">Contact Messages</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/orders">My Orders</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/wishlist">My Wishlist</NavLink>
              </li>
            </>
          )}
        </nav>
      </aside>

      <section className="p-4">
        <Outlet />
      </section>
    </div>
  );
}
