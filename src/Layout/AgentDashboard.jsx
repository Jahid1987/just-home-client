import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";

const AgentDashboard = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  function toggleSidebar() {
    setIsSidebar(!isSidebar);
  }
  // navlinks

  const sidebarLinks = (
    <>
      <NavLink
        to="profile"
        className="flex items-center gap-2 px-2 py-2 text-gray-100 hover:bg-gray-700"
      >
        <FaUser />
        Agent Profile
      </NavLink>
      <NavLink
        to="addproperty"
        className="flex items-center gap-2 px-2 py-2 text-gray-100 hover:bg-gray-700"
      >
        Add Property
      </NavLink>
      <NavLink
        to="addedproperties"
        className="flex items-center gap-2 px-2 py-2 text-gray-100 hover:bg-gray-700"
      >
        My Added Properties
      </NavLink>
      <NavLink
        to="soldproperties"
        className="flex items-center gap-2 px-2 py-2 text-gray-100 hover:bg-gray-700"
      >
        My sold properties
      </NavLink>
      <NavLink
        to="requestedproperties"
        className="flex items-center gap-2 px-2 py-2 text-gray-100 hover:bg-gray-700"
      >
        Requested properties
      </NavLink>
    </>
  );
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebar ? "md:flex" : "hidden"
        } flex-col w-64 bg-gray-800`}
      >
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold uppercase">User Dashboard</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800">{sidebarLinks}</nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 py-3">
          <div className="flex items-center px-4">
            {/* sidebar controller  */}
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none focus:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center pr-4">
            <button className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
              <Link to="/">Home</Link>
            </button>
          </div>
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
