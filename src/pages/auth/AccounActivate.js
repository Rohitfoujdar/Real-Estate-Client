import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import toaster from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function AccounActivate() {
  const { token } = useParams();
  const Navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (token) requestActivation();
  }, [token]);

  const requestActivation = async () => {
    try {
      const { data } = await axios.post(`register`, { token });
      if (data?.error) {
        toaster.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth(data);
        toaster.success("Successfully login. Welcome to Realist app");
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
