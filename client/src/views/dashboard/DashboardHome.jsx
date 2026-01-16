import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

export function DashboardHome() {
  const { user, role } = useAuth();

  return (
    <div className="space-y-4">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h1 className="card-title text-2xl">Dashboard</h1>
          <p className="opacity-80">
            Welcome, {user?.displayName || user?.email} ({role})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {role === "admin" ? (
          <>
            <Link to="/dashboard/admin/products" className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="font-semibold">Manage Products</h2>
                <p className="opacity-80">Create, update, and delete products.</p>
              </div>
            </Link>
            <Link to="/dashboard/admin/orders" className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="font-semibold">Manage Orders</h2>
                <p className="opacity-80">Update order status and view all orders.</p>
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard/orders" className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="font-semibold">My Orders</h2>
                <p className="opacity-80">Track, edit, or cancel your orders.</p>
              </div>
            </Link>
            <Link to="/dashboard/wishlist" className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="font-semibold">My Wishlist</h2>
                <p className="opacity-80">View saved products and buy later.</p>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
