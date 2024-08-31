import axios from "axios";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: "https://hyper.mezudev.site/public/api",
    withCredentials: true,
  });

  return axiosInstance;
};

export default useAxios;
