import { createBrowserRouter } from "react-router";
import AppLayout from "../app/AppLayout";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/", element: <DashboardPage /> },
    ],
  },
]);
