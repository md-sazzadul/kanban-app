import { createBrowserRouter } from "react-router";
import AppLayout from "../app/AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/login", element: <div>Login</div> },
      { path: "/", element: <div>Dashboard</div> },
    ],
  },
]);
