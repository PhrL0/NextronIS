import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { PrivateRoute } from "./components/private-route";
import MyApp from "./pages/app";
import { AiPage } from "./pages/app/ai-page";
import DashboardPage from "./pages/app/dashboard-page";
import { SettingsPage } from "./pages/app/settings-page";
import { LandingPage } from "./pages/landing-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/" />,
  },
  {
    path: "/",
    children: [
      {
        path: "app",
        element: (
          <PrivateRoute>
            <MyApp />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
          {
            path: "ai",
            element: <AiPage />,
          },
        ],
      },

      { index: true, element: <LandingPage /> },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
