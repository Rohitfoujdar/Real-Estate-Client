import React, { useState } from "react";
import Sidebar from "../../../components/nav/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Adcreate() {
  const [sell, setSell] = useState(false);
  const [rent, setRent] = useState(false);
  const Navigate = useNavigate();

  const handleSell = () => {
    setSell(true);
    setRent(false);
  };

  const handleRent = () => {
    setRent(true);
    setSell(false);
  };
  return (
    <div>
      <h3 className="display-1 bg-primary p-5 text-light">Create Ad</h3>
      <Sidebar />
      <div
        className="d-flex justify-content-center align-items-center vh-100 "
        style={{ marginTop: "-10%" }}
      >
        <div className="col-lg-6">
          <button
            className="btn btn -primary btn-lg col-12 p-5"
            onClick={handleSell}
          >
            <span className="h2">SELL</span>
          </button>
          {sell && (
            <div className="my-1">
              <button
                onClick={() => Navigate("/ad/create/sell/house")}
                className="btn btn-secondary p-5 col-6"
              >
                House
              </button>
              <button
                onClick={() => Navigate("/ad/create/sell/land")}
                className="btn btn-secondary p-5 col-6"
              >
                Land
              </button>
            </div>
          )}
        </div>
        <div className="col-lg-6">
          <button
            className="btn btn -primary btn-lg col-12 p-5"
            onClick={handleRent}
          >
            <span className="h2">RENT</span>
          </button>
          {rent && (
            <div className="my-1">
              <button
                onClick={() => Navigate("/ad/create/rent/house")}
                className="btn btn-secondary p-5 col-6"
              >
                House
              </button>
              <button
                onClick={() => Navigate("/ad/create/rent/land")}
                className="btn btn-secondary p-5 col-6"
              >
                Land
              </button>
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
}
