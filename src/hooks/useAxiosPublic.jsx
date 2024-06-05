import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://b9a12-server-side-jahid1987.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
