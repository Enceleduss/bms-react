import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Button } from "@chakra-ui/react";
import { axiosPrivate } from "@/api/axios";
//import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./Login.css";
import { setAuthDetailsAction } from "@/store/auth/auth-slice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { axiosPrivate } = useAxiosPrivate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const generateError = (err) =>
    toast.error(err, {
      position: "top-center",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosPrivate.post(
        "/login",
        {
          ...values,
        },
        { withCredentials: true }
      );

      if (data) {
        console.log("data ", data);
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
          alert(JSON.stringify(data));
        } else {
          if (!data.value) {
            navigate("/");
          }
        }
        console.log("data ", data.user);
        dispatch(
          setAuthDetailsAction({
            user: data.user.username,
            roles: data.user.authorities,
            accessToken: data.jwt,
          })
        );
        navigate("/user-details");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
      alert("Authentication failed: " + error.message);
    }
  };

  // jwt validation
  const authObj = useSelector((store) => store.AUTH);
  //const [cookies, setCookies] = useCookies([]);
  useEffect(() => {
    // return;
    const verifyUser = async () => {
      if (authObj.accessToken) {
        navigate("/user-details");
      }
    };
    verifyUser();
  }, [authObj, navigate]);

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={"formInternalDiv"}>
          <label htmlFor="username">User Name</label>
          <input
            type="username"
            name="username"
            placeholder="User Name"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className={"formInternalDiv"}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <Button colorScheme="teal" variant="solid" onClick={handleSubmit}>
          Login
        </Button>
        <span>
          Dont have an account ? <Link to="/register">Register</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
