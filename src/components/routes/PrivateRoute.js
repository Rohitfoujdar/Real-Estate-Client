import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";

export default function PrivateRoute() {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (auth?.token) getCurrentUser();
  }, [auth?.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get(`current-user`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      setOk(true);
    } catch (error) {
      setOk(false);
    }
  };
  return ok ? <Outlet /> : "";
}
