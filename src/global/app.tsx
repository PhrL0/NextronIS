import { PrivateRoute } from '@/features/auth/components/atom/private-route';
import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import MyApp from '../pages/app';
import { AiPage } from '../pages/app/ai-page';
import DashboardPage from '../pages/app/dashboard-page';
import MachinesPage from '../pages/app/machines';
import MachineIdPage from '../pages/app/machines/[id]';
import { SettingsPage } from '../pages/app/settings-page';
import { LandingPage } from '../pages/external/landing-page';
import LoginPage from '../pages/external/login-page';
import RegisterPage from '../pages/external/register-page';

const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to="/" />
  },
  {
    path: '/',
    children: [
      {
        path: 'app',
        element: (
          <PrivateRoute>
            <MyApp />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardPage />
          },
          {
            path: 'machines',
            element: <MachinesPage />
          },
          {
            path: 'machines/:machine_id',
            element: <MachineIdPage />
          },
          {
            path: 'settings',
            element: <SettingsPage />
          },
          {
            path: 'ai',
            element: <AiPage />
          }
        ]
      },

      { index: true, element: <LandingPage /> },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  }
]);
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
