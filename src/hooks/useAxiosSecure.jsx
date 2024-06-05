import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://b9a12-server-side-jahid1987.vercel.app",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
