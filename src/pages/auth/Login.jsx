import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import auth from "../../firebase/firebase.config";
import PageBanner from "../../components/PageBanner";
import bannerbg from "../../assets/auth.png";
const Login = () => {
  const { signInUser, registerUserWithGoogle } = useAuth();
  const [isPassword, setIsPassword] = useState(true);
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
      await signInUser(data.email, data.password);
      toast.success(`Welcome, ${auth.currentUser.displayName}`);
      navigate(`${location.state || "/"}`);
    } catch (error) {
      toast.error("Your credentials wrong!");
    }
  }

  // sign in with google
  async function handleSignInWithGoogle() {
    try {
      await registerUserWithGoogle();
      toast.success(`Welcome to HJ hotels`);
      navigate(`${location.state || "/"}`);
    } catch (error) {
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
      <div className="card mx-auto mb-5 shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
            <button className="btn btn-sm md:btn-md rounded-none border-none bg-[#B94545] hover:bg-[#b94545e5] text-white hover:text-black uppercase uppercas">
              Login
            </button>
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
          <button
            onClick={handleSignInWithGoogle}
            className="btn btn-outline w-full"
          >
            <FaGoogle className="text-2xl" />
            Log in With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
