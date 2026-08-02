import type { ReactElement } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Main, Login, NotFound } from "@/pages";
import { DocViewerPopup } from "@/components/popup/DocViewerPopup";
import { pagesRoutes, publishingGuideRoutes } from "./pagesRoutes";

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
    {
      path: "/doc/viewer/:lang/:fileId",
      element: <DocViewerPopup />,
    },
    ...publishingGuideRoutes,
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
