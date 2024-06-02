import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import PageBanner from "../../components/PageBanner";
import bannerbg from "../../assets/auth.png";

const Register = () => {
  const { registerWithEmailPass, updateUserProfile } = useAuth();
  const [isPassword, setIsPassword] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  // Registering user here
  async function handleRegister(data) {
    try {
      await registerWithEmailPass(data.email, data.password);
      await updateUserProfile(data.name, data.photo);
      navigate("/");
      toast.success("Registration successfull!");
    } catch (error) {
      console.log(error);
      toast.error("Something is wrong. Try again.");
    }
  }

  return (
    <div>
      <PageBanner
        bannerBg={bannerbg}
        headline={"Register"}
        text="Register if your are new"
      ></PageBanner>
      <div className="card mx-auto mb-5 shrink-0 w-full max-w-sm shadow-2xl bg-base-100 my-5 max-lg:my-8 lg:my-10">
        <form onSubmit={handleSubmit(handleRegister)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <input
              type="text"
              placeholder="photo"
              className="input input-bordered"
              {...register("photo", { required: true })}
            />
            {errors.photo && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
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
                  pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                })}
              />
              <span onClick={() => setIsPassword(!isPassword)}>
                {!isPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </span>
            </label>

            {errors.password && (
              <span className="text-red-500">
                Password must be combination of uppercase, lowercase and atleast
                6 character
              </span>
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-sm md:btn-md rounded-none border-none bg-[#B94545] hover:bg-[#b94545e5] text-white hover:text-black uppercase uppercas">
              Register
            </button>
          </div>
          <p>
            Have accout?{" "}
            <Link className="btn btn-link" to="/login">
              Login Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
