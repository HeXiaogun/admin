import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import NotFoundPage from "../pages/404";
import Address from "../pages/Address";
import LoginPage from "../pages/Login/LoginPage";
import User from "@/pages/User";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AdminLayout />,
      children: [
        {
          path: "/address",
          element: <Address />,
        },
        {
          path: "/user",
          element: <User />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
