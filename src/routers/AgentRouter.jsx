import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AgentRoute = ({ children }) => {
  const { savedUser, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className=" w-full md:w-2/3 lg:w-1/3 mx-auto text-center my-5 md:my-10">
        <span className="loading loading-spinner loading-lg text-[#B94545]"></span>
      </div>
    );
  }
  if (savedUser.role === "agent") {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
};

export default AgentRoute;
