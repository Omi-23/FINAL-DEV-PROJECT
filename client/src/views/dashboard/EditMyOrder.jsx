import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { api } from "../../api/apiClient.js";

export function EditMyOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get(`/api/orders/${orderId}`);
        if (!mounted) return;
        const o = res.data?.data;
        setOrder(o);
        setQuantity(o?.quantity || 1);
        setPhone(o?.phone || "");
        setAddress(o?.address || "");
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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/api/orders/${orderId}`, {
        quantity: Number(quantity),
        phone,
        address
      });
      toast.success("Order updated");
      navigate("/dashboard/orders");
    } catch (e2) {
      toast.error(e2?.response?.data?.message || "Update failed");
    }
  };

  if (loading) {
    return (
      <div>
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="space-y-3">
        <div className="alert alert-error">Order not found</div>
        <Link to="/dashboard/orders" className="btn btn-outline">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Edit Order</h2>
        <Link to="/dashboard/orders" className="btn btn-outline btn-sm">
          Back
        </Link>
      </div>

      <div className="card bg-base-100 shadow mt-4">
        <div className="card-body">
          <div className="opacity-80">Order: {order.orderId}</div>
          <div className="font-semibold">Product: {order?.productId?.title}</div>

          <form className="space-y-3 mt-4" onSubmit={onSubmit}>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Quantity</span>
              </div>
              <input
                className="input input-bordered"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Phone</span>
              </div>
              <input
                className="input input-bordered"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Address</span>
              </div>
              <input
                className="input input-bordered"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>

            <button className="btn btn-primary w-full">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}
