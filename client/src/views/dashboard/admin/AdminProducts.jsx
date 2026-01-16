import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { api } from "../../../api/apiClient.js";

export function AdminProducts() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/products");
      setProducts(res.data?.data || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    const ok = confirm("Delete this product?");
    if (!ok) return;

    try {
      await api.delete(`/api/products/${id}`);
      toast.success("Deleted");
      load();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Manage Products</h2>
        <Link to="/dashboard/admin/products/new" className="btn btn-primary btn-sm">
          Add Product
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
                <th>Title</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.title}</td>
                  <td>৳ {p.price}</td>
                  <td className="space-x-2">
                    <Link
                      className="btn btn-xs btn-outline"
                      to={`/dashboard/admin/products/${p._id}/edit`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => remove(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!products.length ? (
            <div className="opacity-70 mt-3">No products yet.</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
