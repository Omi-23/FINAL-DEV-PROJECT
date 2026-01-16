import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { api } from "../api/apiClient.js";

export function OrderConfirmation() {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get(`/api/orders/${orderId}`);
        if (!mounted) return;
        setOrder(res.data?.data || null);
      } catch (e) {
        toast.error(e?.response?.data?.message || "Failed to load order");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [orderId]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h1 className="card-title text-2xl">Order Confirmation</h1>

          {loading ? (
            <span className="loading loading-spinner loading-lg" />
          ) : order ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-3 rounded bg-base-200">
                  <div className="text-sm opacity-70">Order ID</div>
                  <div className="font-bold">{order.orderId}</div>
                </div>
                <div className="p-3 rounded bg-base-200">
                  <div className="text-sm opacity-70">Status</div>
                  <div className="font-bold capitalize">{order.status}</div>
                </div>
                <div className="p-3 rounded bg-base-200">
                  <div className="text-sm opacity-70">Product</div>
                  <div className="font-semibold">{order?.productId?.title}</div>
                </div>
                <div className="p-3 rounded bg-base-200">
                  <div className="text-sm opacity-70">Quantity</div>
                  <div className="font-semibold">{order.quantity}</div>
                </div>
                <div className="p-3 rounded bg-base-200">
                  <div className="text-sm opacity-70">Unit Price</div>
                  <div className="font-semibold">৳ {order.unitPrice}</div>
                </div>
                <div className="p-3 rounded bg-base-200">
                  <div className="text-sm opacity-70">Total</div>
                  <div className="font-semibold">৳ {Number(order.unitPrice) * Number(order.quantity)}</div>
                </div>
              </div>

              <div className="card-actions justify-end mt-6">
                <Link className="btn" to="/products">
                  Continue Shopping
                </Link>
                <Link className="btn btn-primary" to="/dashboard/orders">
                  View My Orders
                </Link>
              </div>
            </>
          ) : (
            <div className="alert alert-error mt-4">Order not found</div>
          )}
        </div>
      </div>
    </div>
  );
}
