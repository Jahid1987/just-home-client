import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import PrimaryButton from "./PrimaryButton";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const Nav = () => {
  const { user, logOutUser, savedUser } = useAuth();
  // console.log(isLoading);
  // user logout
  async function handleLogOut() {
    await logOutUser();
    toast.success("Logout successfully");
  }

  const navlinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/properties">All properties</NavLink>
      </li>
      <>
        {" "}
        {savedUser?.role === "user" && (
          <li>
            <NavLink to="/userdashboard">User Dashboard</NavLink>
          </li>
        )}
        {savedUser?.role === "agent" && (
          <li>
            <NavLink to="/agentdashboard">Agent Dashboard</NavLink>
          </li>
        )}
        {savedUser?.role === "admin" && (
          <li>
            <NavLink to="/admindashboard">Admin Dashboard</NavLink>
          </li>
        )}
      </>
    </>
  );
  return (
    <div className="navbar  px-6 text-white">
      <div className="navbar-start">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black rounded-box w-52"
          >
            {navlinks}
          </ul>
        </div>
        <img src={logo} alt="" />
        {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navlinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={savedUser?.image}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-black rounded-box w-52 space-y-3"
            >
              <li>
                <a>{savedUser?.name}</a>
              </li>
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <PrimaryButton name="Login" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
