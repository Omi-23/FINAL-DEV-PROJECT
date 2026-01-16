import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { api } from "../api/apiClient.js";

export function Wishlist() {
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
      toast.success("Removed from wishlist");
      load();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to remove");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <Link to="/products" className="btn btn-outline btn-sm">
          Browse Products
        </Link>
      </div>

      {loading ? (
        <div className="mt-6">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {items.map((it) => (
            <div key={it._id} className="card bg-base-100 shadow">
              {it?.productId?.imageUrl ? (
                <figure className="h-40">
                  <img
                    className="w-full h-full object-cover"
                    src={it.productId.imageUrl}
                    alt={it.productId.title}
                  />
                </figure>
              ) : null}
              <div className="card-body">
                <h2 className="card-title">{it?.productId?.title}</h2>
                <div className="flex items-center justify-between">
                  <div className="font-bold">৳ {it?.productId?.price}</div>
                  <Link className="btn btn-primary btn-sm" to={`/products/${it?.productId?._id}`}>
                    View
                  </Link>
                </div>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => remove(it?.productId?._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!items.length ? (
            <div className="opacity-70">Your wishlist is empty.</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
