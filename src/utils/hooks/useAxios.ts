import axios from "axios";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: "https://hyper.mezudev.site/public/api",
  });

  return axiosInstance;
};

export default useAxios;
