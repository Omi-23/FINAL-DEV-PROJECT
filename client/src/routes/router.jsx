import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "../layouts/MainLayout.jsx";
import { DashboardLayout } from "../layouts/DashboardLayout.jsx";
import { ProtectedRoute } from "../components/ProtectedRoute.jsx";
import { AdminRoute } from "../components/AdminRoute.jsx";

import { Home } from "../views/Home.jsx";
import { Products } from "../views/Products.jsx";
import { ProductDetails } from "../views/ProductDetails.jsx";
import { Login } from "../views/Login.jsx";
import { Register } from "../views/Register.jsx";
import { About } from "../views/About.jsx";
import { Contact } from "../views/Contact.jsx";
import { Wishlist } from "../views/Wishlist.jsx";
import { OrderConfirmation } from "../views/OrderConfirmation.jsx";
import { NotFound } from "../views/NotFound.jsx";

import { DashboardHome } from "../views/dashboard/DashboardHome.jsx";
import { MyOrders } from "../views/dashboard/MyOrders.jsx";
import { EditMyOrder } from "../views/dashboard/EditMyOrder.jsx";
import { MyWishlist } from "../views/dashboard/MyWishlist.jsx";

import { AdminProducts } from "../views/dashboard/admin/AdminProducts.jsx";
import { AdminAddProduct } from "../views/dashboard/admin/AdminAddProduct.jsx";
import { AdminEditProduct } from "../views/dashboard/admin/AdminEditProduct.jsx";
import { AdminOrders } from "../views/dashboard/admin/AdminOrders.jsx";
import { AdminMessages } from "../views/dashboard/admin/AdminMessages.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: "order-confirmation/:orderId", element: <ProtectedRoute><OrderConfirmation /></ProtectedRoute> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> }
    ]
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "orders", element: <MyOrders /> },
      { path: "orders/:orderId/edit", element: <EditMyOrder /> },
      { path: "wishlist", element: <MyWishlist /> },

      {
        path: "admin/products",
        element: (
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        )
      },
      {
        path: "admin/products/new",
        element: (
          <AdminRoute>
            <AdminAddProduct />
          </AdminRoute>
        )
      },
      {
        path: "admin/products/:id/edit",
        element: (
          <AdminRoute>
            <AdminEditProduct />
          </AdminRoute>
        )
      },
      {
        path: "admin/orders",
        element: (
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        )
      },
      {
        path: "admin/messages",
        element: (
          <AdminRoute>
            <AdminMessages />
          </AdminRoute>
        )
      }
    ]
  }
]);
