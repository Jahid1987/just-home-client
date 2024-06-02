import useAuth from "./useAuth";
import { axiosPublic } from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //   getting user from mongodb
  async function getUser() {
    try {
      const { data: foundUser } = await axiosSecure.get(`/users/${user.email}`);
      return foundUser;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // creating user in mongodb
  async function createUser(userDetails, image) {
    let newUser = {
      name: userDetails.displayName,
      image,
      email: userDetails.email,
      role: "user",
    };
    await axiosPublic.post("/users", newUser);
    newUser = {};
  }

  return { getUser, createUser };
};

export default useUser;
