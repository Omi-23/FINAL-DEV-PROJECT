import { Outlet } from "react-router-dom";
import { Navbar } from "../shared/Navbar.jsx";
import { Footer } from "../shared/Footer.jsx";

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
