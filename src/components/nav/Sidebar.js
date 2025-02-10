import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink className="nav-link" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/user/whishlist">
            Whishlist
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/user/enquiries">
            Enquiries
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/ad/create">
            Create Ad
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/user/profile">
            Pofile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/user/settings">
           Setting
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
