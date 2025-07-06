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
import MyClaimReqPage from "./pages/myClaimRequest/MyClaimReqPage.tsx";
import SingleLostItem from "./pages/lostItems/SingleLostItem.tsx";
import DashboardLayout from "./dashboard/DashboardLayout.tsx";
import Dashboard from "./dashboard/Dashboard.tsx";
import FoundItemsManagement from "./dashboard/pages/FoundItemsManagement.tsx";
import LostItemsManagement from "./dashboard/pages/LostItemsManagement.tsx";
import ClaimsManagement from "./dashboard/pages/ClaimsManagement.tsx";
import UsersManagement from "./dashboard/pages/UsersManagement.tsx";
import CategoriesManagement from "./dashboard/pages/CategoriesManagement.tsx";
import Settings from "./dashboard/pages/Settings.tsx";
import MyFoundItems from "./dashboard/myFoundItems/MyFoundItems.tsx";
import MyLostItems from "./dashboard/myLostItems/MyLostItems.tsx";
import ReportLostItem from "./pages/reportlostItem/ReportLostItem.tsx";
import ReportFoundItem from "./pages/reportFoundItem/ReportFoundItem.tsx";

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
      {
        path: "/lostItems/:lostItem",
        element: <SingleLostItem />,
      },
      {
        path: "/reportLostItem",
        element: <ReportLostItem />,
      },
      {
        path: "/reportFoundItem",
        element: <ReportFoundItem />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/found-items",
    element: (
      <DashboardLayout>
        <FoundItemsManagement />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/lost-items",
    element: (
      <DashboardLayout>
        <LostItemsManagement />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/claims",
    element: (
      <DashboardLayout>
        <ClaimsManagement />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/users",
    element: (
      <DashboardLayout>
        <UsersManagement />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/categories",
    element: (
      <DashboardLayout>
        <CategoriesManagement />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/settings",
    element: (
      <DashboardLayout>
        <Settings />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/myFoundItems",
    element: (
      <DashboardLayout>
        <MyFoundItems />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/myLostItems",
    element: (
      <DashboardLayout>
        <MyLostItems />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/myClaimRequest",
    element: (
      <DashboardLayout>
        <MyClaimReqPage />
      </DashboardLayout>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
