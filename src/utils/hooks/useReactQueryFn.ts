import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { AxiosRequestConfig } from "axios";
// import { useQueryClient } from "react-query";

type QueryMethod = "get" | "post" | "put" | "delete" | "patch";

export const useReactQuery = (
  key: string,
  path: string,
  method: QueryMethod = "get"
) => {
  const instance = useAxios();

  return useQuery({
    queryKey: [key],
    queryFn: () => instance[method](path),
  });
};
export const useReactIdQuery = (
  key: string,
  path: string,
  id: string | number,
  method: QueryMethod = "get"
) => {
  const instance = useAxios();

  return useQuery({
    queryKey: [key, id],
    queryFn: () => instance[method](path),

    enabled: typeof id === "number" ? id > 0 : parseInt(id) > 0,
  });
};
export const useReactMutation = (
  key: string,
  path: string,
  method: QueryMethod
) => {
  const instance = useAxios();
  const queryClient = useQueryClient();
  //? use this to get logged in status
  // const [isLoggedIn] = useContext<boolean>(false);

  return useMutation({
    mutationFn: (data: unknown) =>
      instance[method](path, data as AxiosRequestConfig<unknown>, {
        headers: {
          Authorization: "",
        },
      }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
};
