import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Providers from "./providers/Providers.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import Register from "./pages/register/Register.tsx";
import Login from "./pages/login/Login.tsx";
import FoundItemsPage from "./pages/foundItems/FoundItems.tsx";
import SingleFoundItem from "./pages/foundItems/SingleFoundItem.tsx";
import LostItemsPage from "./pages/lostItems/LostItems.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/foundItems",
        element: <FoundItemsPage />,
      },
      {
        path: "/lostItems",
        element: <LostItemsPage />,
      },
      {
        path: "/foundItems/:foundItem",
        element: <SingleFoundItem />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
