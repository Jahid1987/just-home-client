import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import PageBanner from "../../components/PageBanner";
import bannerbg from "../../assets/auth.png";
import useUploadImage from "../../hooks/useUploadImage";
import useUser from "../../hooks/useUser";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const { registerWithEmailPass, updateUserProfile } = useAuth();
  const [isPassword, setIsPassword] = useState(true);
  const [isCreating, setisCreating] = useState(false);
  const uploadImage = useUploadImage();
  const { createUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  // Registering user here
  async function handleRegister(data) {
    try {
      setisCreating(true);
      // uploading image to imagebb
      const imageFile = { image: data.image[0] };
      const { success, display_url: photoURL } = await uploadImage(imageFile);

      if (!success) {
        setisCreating(false);
        return toast.error("Cannot upload Image");
      }
      const { user } = await registerWithEmailPass(data.email, data.password);
      await createUser(user, photoURL);
      await updateUserProfile(data.name, photoURL);
      setisCreating(false);
      navigate("/");
      toast.success("Registration successfull!");
    } catch (error) {
      setisCreating(false);
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
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              {...register("name", { required: true })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
              {errors.image && (
                <span className="text-red-500">This field is required</span>
              )}
            </label>
            <input
              className="my-2"
              type="file"
              {...register("image", { required: true })}
            ></input>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
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
            Have accout?{" "}
            <Link className="btn btn-link" to="/login">
              Login Here
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

export default Register;
