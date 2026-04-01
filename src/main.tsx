import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import AppInitializer from "./app/AppInitializer.tsx";
import DataInitializer from "./app/DataInitializer.tsx";
import "./index.css";
import { ThemeProvider } from "./provider/ThemeProvider.tsx";
import { router } from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppInitializer>
        <DataInitializer>
          <RouterProvider router={router} />
        </DataInitializer>
      </AppInitializer>
    </ThemeProvider>
  </StrictMode>,
);
