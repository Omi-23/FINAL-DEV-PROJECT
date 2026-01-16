import { Link, useRouteError } from "react-router-dom";

export function NotFound() {
  const err = useRouteError();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-xl w-full">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h1 className="card-title text-2xl">Page not found</h1>
            <p className="opacity-80">
              {err?.statusText || err?.message || "The page you requested does not exist."}
            </p>
            <div className="card-actions justify-end">
              <Link to="/" className="btn btn-primary">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
