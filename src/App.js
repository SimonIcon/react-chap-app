import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Register from './components/Register';
import Login from './components/Login';
import RecoverPassword from './components/RecoverPassword';
import DashboardPage from './pages/DashboardPage';
import Chat from './components/Chat';
import Root from './components/Root';
import Home from './components/Home';

const App = () => {

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthPage />,
      children: [
        {
          path: "/",
          element: <Login />,
        }, {
          path: "/signUp",
          element: <Register />
        },
        {
          path: "/recover-password",
          element: <RecoverPassword />

        }

      ],
    }, {
      path: "/dashboard",
      element: <Root />,
      children: [
        {
          path: "/dashboard",
          element: <DashboardPage />,
          children: [
            {
              path: "/dashboard/",
              element: <Home />
            },
            {
              path: '/dashboard/chat',
              element: <Chat />
            }
          ]
        }
      ]
    }
  ]);
  return (
    <RouterProvider router={routes} />
  )
}

export default App