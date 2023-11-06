import { axiosPrivate } from "@/api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const authObj = useSelector((store) => store.AUTH);
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        if (!authObj?.accessToken) {
          console.log("token not in auth but not calling refresh");
          //await refresh();
        }
        if (!config.headers["Authorization"]) {
          console.log("finally it has token now " + authObj?.accessToken);
          config.headers["Authorization"] = `Bearer ${authObj?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        //alert("hi");
        const prevRequest = error?.config;
        if (
          (error?.response?.status === 403 ||
            error?.response?.status === 401) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          if (newAccessToken != "") {
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          }
          return Promise.reject(error);
        }
        //alert("hi");
        //if (error?.response?.message)
        return Promise.reject(error);
        //return Promise.reject(
        //   new Error("error?.response?.message " + error?.response?.status)
        //);
        //return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authObj, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
