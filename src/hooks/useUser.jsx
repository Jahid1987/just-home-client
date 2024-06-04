import { axiosPublic } from "./useAxiosPublic";

const useUser = () => {
  // creating user in mongodb
  async function createUser(userDetails, image) {
    try {
      let newUser = {
        name: userDetails.displayName,
        image,
        email: userDetails.email,
        role: "user",
      };
      await axiosPublic.post("/users", newUser);
    } catch (err) {
      return err;
    }
  }

  return { createUser };
};

export default useUser;
