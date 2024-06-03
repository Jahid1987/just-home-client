import { FaGoogle } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const SocialLogin = () => {
  const { registerUserWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { createUser } = useUser();

  // sign in with google
  async function handleSignInWithGoogle() {
    try {
      const { user } = await registerUserWithGoogle();
      createUser(user, user.photoURL)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
      toast.success(`Welcome to JustHome`);
      navigate(`${location.state || "/"}`);
    } catch (error) {
      toast.error("Your credentials wrong!");
    }
  }

  return (
    <div>
      <button
        onClick={handleSignInWithGoogle}
        className="btn btn-outline w-full"
      >
        <FaGoogle className="text-2xl" />
        Log in With Google
      </button>
    </div>
  );
};

export default SocialLogin;
