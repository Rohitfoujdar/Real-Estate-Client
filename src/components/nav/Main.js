import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import toaster from "react-hot-toast";

export default function Main() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ user: null, token: "", refreshToken: "" });
    localStorage.removeItem("auth");
    navigate("/login");
    toaster.success("Logout Successfully");
  };

  const handlePostAdClick = () => {
    if (loggedIn) {
      navigate("/ad/create");
    } else {
      navigate("/login");
    }
  };

  const loggedIn =
    auth.user !== null && auth.token !== "" && auth.refreshToken !== "";

  return (
    <div>
      <nav className="nav d-flex justify-content-between p-2 lead">
        <NavLink className="nav-link" aria-current="page" to="/">
          Home
        </NavLink>
        <a
          className="nav-link"
          style={{ cursor: "pointer" }}
          onClick={handlePostAdClick}
        >
          Post Ad
        </a>
        {!loggedIn ? (
          <>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Signup
            </NavLink>
          </>
        ) : (
          ""
        )}
        {loggedIn ? (
          <div>
            <li>
              <Link
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth?.user?.name ? auth.user.name : auth.user.username}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <a
                  onClick={logout}
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </a>
              </ul>
            </li>
          </div>
        ) : (
          ""
        )}
      </nav>
    </div>
  );
}
