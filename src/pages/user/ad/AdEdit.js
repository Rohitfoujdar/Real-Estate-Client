import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "../../../components/forms/ImageUpload";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Sidebar from "../../../components/nav/Sidebar";

export default function AdEdit({ action, type }) {
  const navigate = useNavigate();
  const params = useParams();
  const [ad, setAd] = useState({
    _id: "",
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

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (params.slug) {
      fetchAd();
    }
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`ad/${params.slug}`);
      setAd(data.ad);
      setLoaded(true)
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async () => {
    try {
      setAd({ ...ad, loading: true });
      //validation
      if (!ad?.photos.length) {
        toast.error("Photos is required");
        return;
      } else if (!ad?.price) {
        toast.error("Price is required");
        return;
      } else if (!ad?.description) {
        toast.error("Description is required");
        return;
      } else {
        //Make API put request
        const { data } = await axios.put(`ad/${ad._id}`, ad);
        if (data?.error) {
          toast.error(data.error);
          setAd({ ...ad, loading: false });
        } else {
          toast.success("Ad Updated Successfully");
          setAd({ ...ad, loading: false });
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };

  const handleDelete = async () => {
    try {
      setAd({ ...ad, loading: true });
             const { data } = await axios.delete(`ad/${ad._id}`);
        if (data?.error) {
          toast.error(data.error);
          setAd({ ...ad, loading: false });
        } else {
          toast.success("Ad Deleted Successfully");
          setAd({ ...ad, loading: false });
          navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, loading: false });
    }
  };
  return (
    <div className="">
      <h1 className="display-1 bg-primary text-light p-5">Ad Edit</h1>
      <Sidebar />
      <div className="container">
        <ImageUpload ad={ad} setAd={setAd} />
        <div className="mb-3 form-control">
          <GooglePlacesAutocomplete
            apiOptions="au"
            selectProps={{
              defaultInputValue: ad?.address,
              placeholder: "Search for address...",
              onChange: (data) => console.log(data),
            }}
          />
        </div>

        {loaded ? (
          <CurrencyInput
            placeholder="Enter price here"
            defaultValue={ad.price}
            className="form-control mb-3"
            onValueChange={(value) => {
              setAd({ ...ad, price: value });
            }}
          />
        ) : (
          " "
        )}

        {ad?.type === "House" ? (
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

       <div className="d-flex justify-content-between">
       <button
          onClick={handleClick}
          className={`btn btn-primary ${ad.loading ? "disabled" : ""} mb-5`}
        >
          {ad.loading ? "Saving..." : "Submit"}
        </button>

        <button
          onClick={handleDelete}
          className={`btn btn-danger ${ad.loading ? "disabled" : ""} mb-5`}
        >
          {ad.loading ? "Deleting..." : "Delete"}
        </button>
       </div>
      </div>
    </div>
  );
}
