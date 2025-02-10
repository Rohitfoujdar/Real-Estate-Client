import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import slugify from "slugify";
import Sidebar from "../../components/nav/Sidebar";

export default function Setting() {
  // state
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setLoading(true); // Show loading state
  
      const { data } = await axios.put("/update-password", { password });
  
      // Handle error returned from the API response
      if (data.error) {
        toast.error(data.error); // Display the error message from the response
      } else {
        toast.success("Password updated successfully!"); // Success message
      }
    } catch (error) {
      // Handle network or unexpected errors
      const errorMessage = error.response?.data?.error || "An unexpected error occurred.";
      toast.error(errorMessage); // Display the error in the toast
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  

  return (
    <>
      <h1 className="display-1 bg-primary text-light p-5">Settings</h1>
      <div className="container-fluid">
        <Sidebar />
        <div className="container mt-2">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <form onSubmit={handleSubmit}>
                <input
                  type="password"
                  placeholder="Update your password"
                  className="form-control mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="btn btn-primary col-12 mb-4"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Update password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
