import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://b9a12-server-side-jahid1987.vercel.app",
});

const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
