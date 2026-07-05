import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

import App from "./App";
import QueryProvider from "./providers/QueryProvider";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >

      <QueryProvider>

        <BrowserRouter>

          <App />

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />

        </BrowserRouter>

      </QueryProvider>

    </GoogleOAuthProvider>

  </React.StrictMode>
);