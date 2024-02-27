import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme.tsx";
import { GlobalStyle } from "./styles/GlobalStyles.tsx";
import { MainPage } from "./views/MainPage/MainPage.tsx";
import { NotFoundPage } from "./views/NotFoundPage/NotFoundPage.tsx";
import { Layout } from "./components/Layout/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
