import axios from "axios";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
  });

  return axiosInstance;
};

export default useAxios;
