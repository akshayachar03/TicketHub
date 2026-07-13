import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,

          success: {
            style: {
              background: "#0f172a",
              color: "#22c55e",
            },
          },

          error: {
            style: {
              background: "#0f172a",
              color: "#ef4444",
            },
          },
        }}
      />

      <App />
    </AuthProvider>
  </StrictMode>
);