import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import AppInitializer from "./app/AppInitializer.tsx";
import "./index.css";
import { router } from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppInitializer>
      <RouterProvider router={router} />
    </AppInitializer>
  </StrictMode>,
);
