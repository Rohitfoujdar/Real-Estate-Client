import React, { useState } from "react";
import axios from "axios";
// import { API } from "../config";
import toaster from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function Login() {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("email:",email, "password:",password)
      setLoading(true);
      const { data } = await axios.post(`login`, {
        email,
        password,
      });
      if (data?.error) {
        toaster.error(data.error);
        setLoading(false);
      } else {
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));
        toaster.success("Login Successfully");
        setLoading(false);
        location.state !== null ? Navigate(location.state):  Navigate("/dashboard");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toaster.error("Something went wrong try again");
      setLoading(false);
    }
  };
  return (
    <div>
      <h3 className="display-1 bg-primary p-5 text-light">Login</h3>

      <div className="">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your Email"
                className="form-control mb-4"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                className="form-control mb-4"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary col-12 mb-4">
                {loading ? "Waiting..." : "Login"}
              </button>
            </form>
            <Link className="text-danger" to="/auth/forget-password">
              Forget password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
