import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { api } from "../../../api/apiClient.js";

export function AdminAddProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/api/products", {
        title,
        price: Number(price),
        imageUrl,
        shortDescription,
        description
      });
      toast.success("Product created");
      navigate("/dashboard/admin/products");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Add Product</h2>
        <Link to="/dashboard/admin/products" className="btn btn-outline btn-sm">
          Back
        </Link>
      </div>

      <div className="card bg-base-100 shadow mt-4">
        <div className="card-body">
          <form className="space-y-3" onSubmit={onSubmit}>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <input
                className="input input-bordered"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                className="input input-bordered"
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Image URL</span>
              </div>
              <input
                className="input input-bordered"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Short Description</span>
              </div>
              <input
                className="input input-bordered"
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Full Description</span>
              </div>
              <textarea
                className="textarea textarea-bordered"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Saving..." : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
