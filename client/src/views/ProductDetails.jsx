import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { api } from "../api/apiClient.js";
import { useAuth } from "../hooks/useAuth.js";
import { auth } from "../firebase/firebase.config.js";

function StarRow({ value }) {
  const v = Number(value || 0);
  return (
    <div className="rating rating-sm">
      {[1, 2, 3, 4, 5].map((i) => (
        <input
          key={i}
          type="radio"
          className="mask mask-star-2 bg-orange-400"
          checked={i === Math.round(v)}
          readOnly
        />
      ))}
    </div>
  );
}

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get(`/api/products/${id}`);
        if (!mounted) return;
        setDetails(res.data?.data || null);
      } catch (e) {
        toast.error("Failed to load product");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  const product = details?.product;
  const reviews = details?.reviews || [];

  const canOrder = Boolean(user);

  const total = useMemo(() => {
    const unit = Number(product?.price || 0);
    const qty = Number(quantity || 1);
    return unit * qty;
  }, [product?.price, quantity]);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to place an order");
      return navigate("/login");
    }

    try {
      // Get fresh token before making the request
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast.error("Please login to place an order");
        return navigate("/login");
      }

      // Force refresh token to ensure it's valid
      const idToken = await currentUser.getIdToken(true);
      
      // Make the API call - interceptor will handle token, but we ensure it's set
      const res = await api.post("/api/orders", {
        productId: id,
        quantity: Number(quantity),
        phone,
        address
      }, {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });

      const order = res.data?.data;
      toast.success("Order placed successfully");
      navigate(`/order-confirmation/${order.orderId}`);
    } catch (e2) {
      console.error("Order error:", e2);
      const errorMessage = e2?.response?.data?.message || e2?.message || "Failed to place order";
      toast.error(errorMessage);
      
      // Only redirect if it's actually a 401 error
      if (e2?.response?.status === 401) {
        toast.error("Session expired. Please login again");
        // Small delay before redirect to show error message
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to submit a review");
      return navigate("/login");
    }

    try {
      await api.post(`/api/products/${id}/reviews`, {
        rating: Number(rating),
        comment
      });
      toast.success("Review submitted");
      const res = await api.get(`/api/products/${id}`);
      setDetails(res.data?.data || null);
      setComment("");
    } catch (e2) {
      toast.error(e2?.response?.data?.message || "Failed to submit review");
    }
  };

  const handleToggleWishlist = async () => {
    if (!user) {
      toast.error("Please login to use wishlist");
      return navigate("/login");
    }

    setWishlistLoading(true);
    try {
      const res = await api.post("/api/wishlist/toggle", { productId: id });
      const inWishlist = res.data?.data?.inWishlist;
      toast.success(inWishlist ? "Added to wishlist" : "Removed from wishlist");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Wishlist update failed");
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="alert alert-error">Product not found</div>
        <div className="mt-4">
          <Link to="/products" className="btn btn-outline">
            Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow">
          {product.imageUrl ? (
            <figure className="h-64">
              <img
                className="w-full h-full object-cover"
                src={product.imageUrl}
                alt={product.title}
              />
            </figure>
          ) : null}
          <div className="card-body">
            <h1 className="card-title text-2xl">{product.title}</h1>
            <div className="flex items-center justify-between">
              <div className="font-bold text-lg">৳ {product.price}</div>
              <div className="flex items-center gap-2">
                <StarRow value={details?.avgRating || 0} />
                <span className="text-sm opacity-70">({details?.reviewCount || 0})</span>
              </div>
            </div>
            <p className="opacity-80">{product.description}</p>

            <div className="card-actions justify-end">
              <button
                className="btn btn-outline"
                onClick={handleToggleWishlist}
                disabled={wishlistLoading}
              >
                {wishlistLoading ? "Please wait..." : "Toggle Wishlist"}
              </button>
              <Link className="btn" to="/products">
                Back
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Purchase / Order</h2>
              <form className="space-y-3" onSubmit={handleOrder}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                </div>

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

                <div className="flex items-center justify-between">
                  <div className="font-semibold">Total: ৳ {total}</div>
                  <button className="btn btn-primary" disabled={!canOrder}>
                    {canOrder ? "Place Order" : "Login Required"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">Reviews</h2>

              <div className="space-y-3">
                {reviews.map((r) => (
                  <div key={r._id} className="p-3 rounded bg-base-200">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{r?.userId?.name || "User"}</div>
                      <div className="badge badge-primary">{r.rating} / 5</div>
                    </div>
                    <div className="opacity-80 mt-1">{r.comment}</div>
                  </div>
                ))}
                {!reviews.length ? (
                  <div className="opacity-70">No reviews yet.</div>
                ) : null}
              </div>

              <div className="divider" />

              <form className="space-y-3" onSubmit={handleReview}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Rating (1-5)</span>
                    </div>
                    <input
                      className="input input-bordered"
                      type="number"
                      min={1}
                      max={5}
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      required
                    />
                  </label>

                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Comment</span>
                    </div>
                    <input
                      className="input input-bordered"
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </label>
                </div>

                <div className="flex justify-end">
                  <button className="btn btn-outline">Submit Review</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
