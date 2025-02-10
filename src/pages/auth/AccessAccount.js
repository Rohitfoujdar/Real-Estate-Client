import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import toaster from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function AccessAccount() {
  const { token } = useParams();
  const Navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (token) requestAccess();
  }, [token]);

  const requestAccess = async () => {
    try {
      const { data } = await axios.post(`access-account`, { token });
      if (data?.error) {
        toaster.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth(data);
        toaster.success("Please update your password in profile page");
        Navigate("/");
      }
    } catch (error) {
      console.log(error);
      toaster.error("Something went wrong try again");
    }
  };

  console.log(token);
  return (
    <div className="display-1 d-flex justify-content-center align-items-center vh-100">
      Please Wait...
    </div>
  );
}
