import { setAuthDetailsAction } from "@/store/auth/auth-slice";
import { clearAuthDetailsAction } from "@/store/auth/auth-slice";
import { axiosWithCreds } from "@/api/axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export const useRefreshToken = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refresh = async () => {
    try {
      const response = await axiosWithCreds.get("/refresh");
      console.log(
        "got access tojen from refresh request ",
        JSON.stringify(response.data.jwt)
      );
      await dispatch(
        setAuthDetailsAction({
          user: response.data.user.username,
          roles: response.data.user.authorities,
          accessToken: response.data.jwt,
        })
      );
      return response.data.jwt;
    } catch (err) {
      await dispatch(clearAuthDetailsAction());
      navigate("/");
      return "";
    }
  };
  return refresh;
};

export default useRefreshToken;
