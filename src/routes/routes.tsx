import type { ReactElement } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Main, Login, NotFound } from "@/pages";
import { pagesRoutes, publishingGuideRoutes } from "./pagesRoutes";

// eslint-disable-next-line react-refresh/only-export-components
function RequireAuth({ children }: { children: ReactElement }) {
  const accessToken = sessionStorage.getItem("access_token");
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <RequireAuth>
          <Main />
        </RequireAuth>
      ),
      children: [
        { index: true, element: <Navigate to="main" replace /> },
        ...pagesRoutes,
        { path: "*", element: <NotFound /> },
      ],
    },
    ...publishingGuideRoutes,
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
