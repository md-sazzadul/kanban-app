import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
    children: [
      { path: "/login", element: <div>Login</div> },
      { path: "/", element: <div>Dashboard</div> },
    ],
  },
]);
