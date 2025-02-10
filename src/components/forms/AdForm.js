import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdForm({ action, type }) {
  const navigate = useNavigate();
  const [ad, setAd] = useState({
    photos: [],
    uploading: false,
    price: "",
    address: "sydney",
    bedrooms: "",
    bathrooms: "",
    carparks: "",
    landsize: "",
    title: "",
    description: "",
    loading: false,
    action,
    type,
  });

  const handleClick = async () => {
    try {
      setAd({ ...ad, loading: true });
      const { data } = await axios.post("ad", ad);
      console.log("ad response =>", data);
      if (data?.error) {
        toast.error(data.error);
        setAd({ ...ad, loading: false });
      } else {
        toast.success("Ad Created Successfully");
        setAd({ ...ad, loading: false });
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };
  return (
    <>
      <ImageUpload ad={ad} setAd={setAd} />
      <div className="mb-3 form-control">
        <GooglePlacesAutocomplete
          apiKey={GOOGLE_PLACES_KEY}
          apiOptions="au"
          selectProps={{
            defaultInputValue: ad?.address,
            placeholder: "Search for address...",
            onChange: (data) => console.log(data),
          }}
        />
      </div>

      <CurrencyInput
        placeholder="Enter price here"
        defaultValue={ad.price}
        className="form-control mb-3"
        onValueChange={(value) => {
          setAd({ ...ad, price: value });
        }}
      />

      {type === "House" ? (
        <>
          <input
            placeholder="Enter how many bedrooms"
            type="number"
            min="0"
            className="form-control mb-3"
            value={ad.bedrooms}
            onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
          />

          <input
            placeholder="Enter how many bathrooms"
            type="number"
            min="0"
            className="form-control mb-3"
            value={ad.bathrooms}
            onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
          />

          <input
            placeholder="Enter how many carparks"
            type="number"
            min="0"
            className="form-control mb-3"
            value={ad.carparks}
            onChange={(e) => setAd({ ...ad, carparks: e.target.value })}
          />
        </>
      ) : (
        ""
      )}

      <input
        placeholder="Size of land"
        type="text"
        min="0"
        className="form-control mb-3"
        value={ad.landsize}
        onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
      />

      <input
        placeholder="Enter title"
        type="text"
        className="form-control mb-3"
        value={ad.title}
        onChange={(e) => setAd({ ...ad, title: e.target.value })}
      />

      <textarea
        placeholder="Enter description"
        className="form-control mb-3"
        value={ad.description}
        onChange={(e) => setAd({ ...ad, description: e.target.value })}
      />

      <button
        onClick={handleClick}
        className={`btn btn-primary ${ad.loading ? "disabled" : ""} mb-5`}
      >
        {ad.loading ? "Saving..." : "Submit"}
      </button>
      <br />
      {/* <pre>{JSON.stringify(ad, null, 4)}</pre> */}
    </>
  );
}
