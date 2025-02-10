import React, { useState } from "react";
import axios from "axios";
import toaster from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`forget-password`, {
        email,
      });
      if (data?.error) {
        toaster.error(data.error);
        setLoading(false);
      } else {
        toaster.success("Please check your email to reset your password");
        setLoading(false);
        Navigate("/");
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
      <h3 className="display-1 bg-primary p-5 text-light">Forget password</h3>

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
              <button className="btn btn-primary col-12 mb-4">
                {loading ? "Waiting..." : "Submit"}
              </button>
            </form>
            <Link className="text-danger" to="/login">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
