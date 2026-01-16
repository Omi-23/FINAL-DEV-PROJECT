import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../api/apiClient.js";

export function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get("/api/products");
        if (!mounted) return;
        setProducts(res.data?.data || []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      String(p.title || "").toLowerCase().includes(q)
    );
  }, [products, query]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-bold">Products</h1>
        <label className="input input-bordered flex items-center gap-2 max-w-md">
          <input
            type="text"
            className="grow"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      {loading ? (
        <div className="mt-8">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {filtered.map((p) => (
            <div key={p._id} className="card bg-base-100 shadow">
              {p.imageUrl ? (
                <figure className="h-44">
                  <img
                    className="w-full h-full object-cover"
                    src={p.imageUrl}
                    alt={p.title}
                  />
                </figure>
              ) : null}
              <div className="card-body">
                <h2 className="card-title">{p.title}</h2>
                <p className="opacity-80">{p.shortDescription}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="font-bold">৳ {p.price}</div>
                  <Link className="btn btn-primary btn-sm" to={`/products/${p._id}`}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {!filtered.length ? (
            <div className="opacity-70">No products found.</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
