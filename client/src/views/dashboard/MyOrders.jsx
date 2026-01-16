import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { api } from "../../api/apiClient.js";

export function MyOrders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/orders/my");
      setOrders(res.data?.data || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (orderId) => {
    try {
      await api.delete(`/api/orders/${orderId}`);
      toast.success("Order canceled");
      load();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Cancel failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Orders</h2>
        <Link to="/products" className="btn btn-outline btn-sm">
          Buy More
        </Link>
      </div>

      {loading ? (
        <div className="mt-6">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{o.orderId}</td>
                  <td>{o?.productId?.title}</td>
                  <td>{o.quantity}</td>
                  <td className="capitalize">{o.status}</td>
                  <td>৳ {Number(o.unitPrice) * Number(o.quantity)}</td>
                  <td className="space-x-2">
                    <Link
                      to={`/dashboard/orders/${o.orderId}/edit`}
                      className="btn btn-xs btn-outline"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => cancel(o.orderId)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!orders.length ? (
            <div className="opacity-70 mt-3">No orders found.</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
