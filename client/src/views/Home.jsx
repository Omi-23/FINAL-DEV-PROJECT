import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../api/apiClient.js";

function HeroSlider() {
  const slides = useMemo(
    () => [
      {
        title: "Smart Shopping, Better Choices",
        desc: "Browse products, read reviews, and order securely with Firebase login.",
        cta: "/products",
        ctaText: "Browse Products"
      },
      {
        title: "Fast Orders & Easy Tracking",
        desc: "Place an order in seconds and track status from your dashboard.",
        cta: "/dashboard",
        ctaText: "Go to Dashboard"
      },
      {
        title: "Wishlist Your Favorites",
        desc: "Save products to your wishlist and purchase later.",
        cta: "/wishlist",
        ctaText: "View Wishlist"
      }
    ],
    []
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div className="bg-base-200">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">{slides[index].title}</h2>
            <p className="mt-3 opacity-80">{slides[index].desc}</p>
            <div className="mt-5 flex gap-3">
              <Link className="btn btn-primary" to={slides[index].cta}>
                {slides[index].ctaText}
              </Link>
              <Link className="btn btn-outline" to="/contact">
                Contact Us
              </Link>
            </div>
            <div className="mt-6 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`btn btn-xs ${i === index ? "btn-primary" : "btn-ghost"}`}
                  onClick={() => setIndex(i)}
                  aria-label={`slide-${i}`}
                />
              ))}
            </div>
          </div>

          {/* <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="font-semibold">Featured Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="p-3 rounded bg-base-200">Secure Firebase Auth</div>
                <div className="p-3 rounded bg-base-200">Role-Based Dashboard</div>
                <div className="p-3 rounded bg-base-200">Reviews & Ratings</div>
                <div className="p-3 rounded bg-base-200">Wishlist Feature</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

function ReviewSlider() {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get("/api/reviews/recent?limit=10");
        if (!mounted) return;
        setReviews(res.data?.data || []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!reviews.length) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(t);
  }, [reviews.length]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-bold">Customer Reviews</h3>
        <Link to="/products" className="link link-primary">
          See products
        </Link>
      </div>

      {loading ? (
        <div className="mt-6">
          <span className="loading loading-spinner loading-md" />
        </div>
      ) : reviews.length ? (
        <div className="mt-5">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <div className="flex items-center justify-between gap-2">
                <div className="font-semibold">
                  {reviews[index]?.userId?.name || "Anonymous"}
                </div>
                <div className="badge badge-primary">{reviews[index]?.rating} / 5</div>
              </div>
              <div className="opacity-80 mt-2">{reviews[index]?.comment || ""}</div>
              <div className="text-sm opacity-70 mt-3">
                Product: {reviews[index]?.productId?.title || ""}
              </div>
              <div className="mt-4 flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    className={`btn btn-xs ${i === index ? "btn-primary" : "btn-ghost"}`}
                    onClick={() => setIndex(i)}
                    aria-label={`review-${i}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-4 opacity-70">No reviews yet. Be the first to review a product.</p>
      )}
    </div>
  );
}

export function Home() {
  return (
    <div>
      <HeroSlider />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Products</h3>
          <Link className="btn btn-outline btn-sm" to="/products">
            View All
          </Link>
        </div>
        <p className="opacity-80 mt-2">
          Discover trending products and order with confidence.
        </p>
      </div>

      <ReviewSlider />
    </div>
  );
}
