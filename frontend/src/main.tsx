import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme.tsx";
import { GlobalStyle } from "./styles/GlobalStyles.tsx";
import { MainPage } from "./views/MainPage/MainPage.tsx";
import { NotFoundPage } from "./views/NotFoundPage/NotFoundPage.tsx";
import { Layout } from "./components/Layout/Layout.tsx";
import { RequestPage } from "./views/RequestPage/RequestPage.tsx";
import ErrorBoundary from "./components/Error/ErrorBoundary.tsx";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./config/azureConfig.ts";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: (
          <ErrorBoundary>
            <MainPage />
          </ErrorBoundary>
        ),
        errorElement: <ErrorBoundary children={<MainPage />} />,
      },
      {
        path: "request/:id/:stepID?",
        element: (
          <ErrorBoundary>
            <RequestPage />
          </ErrorBoundary>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </MsalProvider>
  </React.StrictMode>
);
