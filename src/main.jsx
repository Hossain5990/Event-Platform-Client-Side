import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import AuthProvider from './Provider/AuthProvider';
import Dashboard from './Components/Dashboard';
import PrivateRoute from './Routes/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [

      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "Register",
        element: <Register></Register>,
      },
      {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      },





    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
     <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>,
)
