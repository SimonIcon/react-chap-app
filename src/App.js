import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Register from './components/Register';
import ChatPage from './pages/ChatPage';
import Login from './components/Login';
import RecoverPassword from './components/RecoverPassword';

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
      path: "chat",
      element: <ChatPage />
    }
  ]);
  return (
    <RouterProvider router={routes} />
  )
}

export default App