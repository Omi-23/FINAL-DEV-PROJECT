import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { api } from "../../../api/apiClient.js";

export function AdminOrders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/orders");
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

  const updateStatus = async (orderId, status) => {
    try {
      await api.patch(`/api/orders/${orderId}/status`, { status });
      toast.success("Status updated");
      load();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Manage Orders</h2>

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
                <th>User</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id}>
                  <td>{o.orderId}</td>
                  <td>{o?.userId?.email}</td>
                  <td>{o?.productId?.title}</td>
                  <td>{o.quantity}</td>
                  <td className="capitalize">{o.status}</td>
                  <td>
                    <select
                      className="select select-bordered select-sm"
                      value={o.status}
                      onChange={(e) => updateStatus(o.orderId, e.target.value)}
                    >
                      <option value="pending">pending</option>
                      <option value="confirmed">confirmed</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="canceled">canceled</option>
                    </select>
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
