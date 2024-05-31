import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../pages/Home";
import Properties from "../pages/Properties";
import UserDashboard from "../pages/UserDashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PropertyDetails from "../pages/PropertyDetails";
import { axiosPublic } from "../hooks/useAxiosPublic";

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
        element: <Properties />,
      },
      {
        path: "/propertydetails/:id",
        loader: ({ params }) => axiosPublic(`/properties/${params.id}`),
        element: <PropertyDetails />,
      },
      {
        path: "/dashboard",
        element: <UserDashboard />,
      },
    ],
  },
]);

export default router;