import { createBrowserRouter } from "react-router";
import AppLayout from "../app/AppLayout";
import BoardPage from "../pages/BoardPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <BoardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
