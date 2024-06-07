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
import Reviews from "../pages/userDashboard/Reviews";
import AdminDashboard from "../Layout/AdminDashboard";
import ManageProperties from "../pages/adminDashboard/ManageProperties";
import ManageUsers from "../pages/adminDashboard/ManageUsers";
import ManageReviews from "../pages/adminDashboard/ManageReviews";
import AdminProfile from "../pages/adminDashboard/AdminProfile";
import AgentProfile from "../pages/agentDashboard/AgentProfile";
import AgentDashboard from "../Layout/AgentDashboard";
import AddProperty from "../pages/agentDashboard/AddProperty";
import AddedProperties from "../pages/agentDashboard/AddedProperties";
import SoldProperties from "../pages/agentDashboard/SoldProperties";
import RequestedProperties from "../pages/agentDashboard/RequestedProperties";
import MakeOffer from "../pages/userDashboard/MakeOffer";
import UpdateProperty from "../pages/agentDashboard/UpdateProperty";
import Payment from "../pages/userDashboard/Payment";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "properties",
        element: (
          <PrivateRoute>
            <Properties />
          </PrivateRoute>
        ),
      },
      {
        path: "propertydetails/:id",
        loader: ({ params }) => axiosPublic(`/propertydetails/${params.id}`),
        element: (
          <PrivateRoute>
            <PropertyDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "userdashboard",
    element: (
      <PrivateRoute>
        <UserDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      { path: "wishlist/makeoffer/:id", element: <MakeOffer /> },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "payment/:id",
        element: <Payment />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
    ],
  },
  {
    path: "agentdashboard",
    element: (
      <PrivateRoute>
        <AgentDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <AgentProfile />,
      },
      {
        path: "addproperty",
        element: <AddProperty />,
      },
      {
        path: "updateproperty/:id",
        element: <UpdateProperty />,
      },
      {
        path: "addedproperties",
        element: <AddedProperties />,
      },
      {
        path: "soldproperties",
        element: <SoldProperties />,
      },
      {
        path: "requestedproperties",
        element: <RequestedProperties />,
      },
    ],
  },
  {
    path: "admindashboard",
    element: (
      <PrivateRoute>
        <AdminDashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
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
