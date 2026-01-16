import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer footer-center p-6 bg-base-200 text-base-content">
      <nav className="grid grid-flow-col gap-4">
        <Link to="/" className="link link-hover">
          Home
        </Link>
        <Link to="/products" className="link link-hover">
          Products
        </Link>
        <Link to="/about" className="link link-hover">
          About
        </Link>
        <Link to="/contact" className="link link-hover">
          Contact
        </Link>
      </nav>
      <nav>
        {/* <div className="grid grid-flow-col gap-4">
          <a className="link link-hover" href="#">
            Facebook
          </a>
          <a className="link link-hover" href="#">
            GitHub
          </a>
          <a className="link link-hover" href="#">
            LinkedIn
          </a>
        </div> */}
      </nav>
      <aside>
        <p>Copyright © {new Date().getFullYear()} - Smart E-Commerce</p>
      </aside>
    </footer>
  );
}
