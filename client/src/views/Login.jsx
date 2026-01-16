import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../hooks/useAuth.js";

export function Login() {
  const { login, loginWithGoogle, loginWithGithub } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const social = async (fn) => {
    setLoading(true);
    try {
      await fn();
      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h1 className="card-title text-2xl">Login</h1>

          <form className="space-y-3" onSubmit={onSubmit}>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                className="input input-bordered"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                className="input input-bordered"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Please wait..." : "Login"}
            </button>
          </form>

          <div className="divider">OR</div>

          <div className="grid grid-cols-1 gap-2">
            <button
              className="btn btn-outline"
              onClick={() => social(loginWithGoogle)}
              disabled={loading}
            >
              Continue with Google
            </button>
            <button
              className="btn btn-outline"
              onClick={() => social(loginWithGithub)}
              disabled={loading}
            >
              Continue with GitHub
            </button>
          </div>

          <p className="mt-4 text-sm opacity-80">
            New here?{" "}
            <Link className="link link-primary" to="/register">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
