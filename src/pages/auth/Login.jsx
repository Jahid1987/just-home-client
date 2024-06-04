import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import auth from "../../firebase/firebase.config";
import PageBanner from "../../components/PageBanner";
import bannerbg from "../../assets/auth.png";
import SocialLogin from "./SocialLogin";
const Login = () => {
  const { signInUser } = useAuth();
  const [isPassword, setIsPassword] = useState(true);
  const [isCreating, setisCreating] = useState(false);
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // sign in registered user
  async function handleSignIn(data) {
    try {
      setisCreating(true);
      await signInUser(data.email, data.password);
      setisCreating(false);
      toast.success(`Welcome, ${auth.currentUser.displayName}`);
      navigate(`${location.state || "/"}`);
    } catch (error) {
      setisCreating(false);
      toast.error("Your credentials wrong!");
    }
  }

  return (
    <div>
      <PageBanner
        bannerBg={bannerbg}
        headline={"Login"}
        text="Login if your are registered"
      ></PageBanner>
      <div className="card mx-auto mb-5 shrink-0 w-full max-w-sm shadow-2xl bg-base-100 my-5 max-lg:my-8 lg:my-10">
        <form onSubmit={handleSubmit(handleSignIn)} className="card-body -mb-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type={isPassword ? "password" : "text"}
                name="password"
                className="grow"
                placeholder="Search"
                {...register("password", {
                  required: true,
                })}
              />
              <span onClick={() => setIsPassword(!isPassword)}>
                {!isPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </label>

            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control mt-6">
            {isCreating ? (
              <button className="btn btn-sm md:btn-md  btn-outline w-full btn-warning text-white font-light">
                <span className="loading loading-spinner loading-md"></span>
              </button>
            ) : (
              <button className="btn btn-sm md:btn-md  btn-outline w-full btn-warning text-white font-light">
                Register
              </button>
            )}
          </div>
          <p>
            Have no accout?{" "}
            <Link className="btn btn-link" to="/register">
              Register Here
            </Link>
          </p>
        </form>

        <h3 className="text-2xl text-center font-semibold mb-2">Or</h3>
        <div className="mx-auto mb-5 text-center space-y-3 flex flex-col w-2/3">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
