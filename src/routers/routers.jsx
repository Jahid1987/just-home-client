import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../pages/Home";
import Properties from "../pages/Properties";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PropertyDetails from "../pages/PropertyDetails";
import { axiosPublic } from "../hooks/useAxiosPublic";
import PrivateRoute from "./PrivateRouter";
import UserDashboard from "../Layout/UserDashboard";
import UserProfile from "../pages/userDashboard/UserProfile";
import Wishlist from "../pages/userDashboard/Wishlist";
import Orders from "../pages/userDashboard/Orders";
import Reiviews from "../pages/userDashboard/Reiviews";
import AdminDashboard from "../Layout/AdminDashboard";
import ManageProperties from "../pages/adminDashboard/ManageProperties";
import ManageUsers from "../pages/adminDashboard/ManageUsers";
import ManageReviews from "../pages/adminDashboard/ManageReviews";
import AdminProfile from "../pages/adminDashboard/AdminProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <h3>page not found</h3>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/properties",
        element: (
          <PrivateRoute>
            <Properties />
          </PrivateRoute>
        ),
      },
      {
        path: "/propertydetails/:id",
        loader: ({ params }) => axiosPublic(`/properties/${params.id}`),
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/userdashboard",
    element: (
      <PrivateRoute>
        <UserDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/userdashboard/profile",
        element: <UserProfile />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "reviews",
        element: <Reiviews />,
      },
    ],
  },
  {
    path: "/admindashboard",
    element: <AdminDashboard />,
    children: [
      {
        path: "/admindashboard/profile",
        element: <AdminProfile />,
      },
      {
        path: "properties",
        element: <ManageProperties />,
      },
      {
        path: "users",
        element: <ManageUsers />,
      },
      {
        path: "reviews",
        element: <ManageReviews />,
      },
    ],
  },
]);

export default router;
