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
import TourDetails from './Components/TourDetails';
import AllTours from './pages/AllTours';
import AddEvents from './pages/AddEvents';
import AllUsers from './pages/AllUsers';
import MyEvents from './pages/MyEvents';
import AdminDashboard from './pages/AdminDashboard';
import BookTickets from './Components/BookTickets';
import MyTickets from './pages/MyTickets';
import Payment from './Components/Payment';
import PaymentHistory from './pages/PaymentHistory';
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
      {
        path: "/tours/:id",
        element: <PrivateRoute><TourDetails></TourDetails></PrivateRoute>,
      },
       {
        path: "/bookticket/:id",
        element: <PrivateRoute><BookTickets></BookTickets></PrivateRoute>,
      },
      {
        path: "mytickets",
        element: <PrivateRoute><MyTickets></MyTickets></PrivateRoute>,
      },
          {
        path: "payment",
        element: <PrivateRoute><Payment></Payment></PrivateRoute>,
      },
          {
        path: "paymenthistory",
        element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>,
      },
      {
        path: "alltours",
        element: <AllTours></AllTours>,
      },
      {
        path: "addevents",
        element: <PrivateRoute><AddEvents></AddEvents></PrivateRoute>,
      },
      {
        path: "myevents",
        element: <PrivateRoute><MyEvents></MyEvents></PrivateRoute>,
      },
      {
        path: "users",
        element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>,
      },
      {
        path: "admindashboard",
        element: <PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>,
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
