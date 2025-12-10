import ProtectedRouter from "@/component/Auth/ProtectedRouter";
import MainLayout from "@/layout/MainLayout";
import AboutUs from "@/pages/AboutUs";
import Categories from "@/pages/Categories";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Products from "@/pages/Products";
import Register from "@/pages/Register";
import ShoppingCart from "@/pages/ShoppingCart";
import WishlistPage from "@/pages/wishlistPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Account from "@/pages/Account";
import Orders from "@/pages/Orders";
import ProfileLayout from "@/layout/ProfileLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "products/:prefix",
        element: <Products />,
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("bad request", {
              statusText: "invalid product name",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "aboutUs",
        element: <AboutUs />,
      },
      {
        path: "cart",
        element: <ShoppingCart />,
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRouter>
            <WishlistPage />
          </ProtectedRouter>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRouter>
            <ProfileLayout />
          </ProtectedRouter>
        ),
        children: [
          {
            index: true,
            element: <Account />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
