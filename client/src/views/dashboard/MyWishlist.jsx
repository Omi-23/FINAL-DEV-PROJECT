import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { api } from "../../api/apiClient.js";

export function MyWishlist() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/wishlist");
      setItems(res.data?.data || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (productId) => {
    try {
      await api.delete(`/api/wishlist/${productId}`);
      toast.success("Removed");
      load();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Remove failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Wishlist</h2>
        <Link to="/products" className="btn btn-outline btn-sm">
          Browse
        </Link>
      </div>

      {loading ? (
        <div className="mt-6">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {items.map((it) => (
            <div key={it._id} className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="font-semibold">{it?.productId?.title}</h3>
                <div className="opacity-80">৳ {it?.productId?.price}</div>
                <div className="card-actions justify-end">
                  <Link className="btn btn-xs" to={`/products/${it?.productId?._id}`}>
                    View
                  </Link>
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => remove(it?.productId?._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!items.length ? (
            <div className="opacity-70">No wishlist items.</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
