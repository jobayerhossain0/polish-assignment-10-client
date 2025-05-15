import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./provider/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./provider/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <HelmetProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              className: "",
              duration: 3000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
              error: {
                duration: 3000,
                theme: {
                  primary: "red",
                  secondary: "black",
                },
              },
            }}
          />
          <App />
        </HelmetProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
