import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "../components/misc/ImageGallery";
import AdFeatures from "../components/cards/AdFeatures";
import { formatNumber } from "../helpers/Ad";
import dayjs from "dayjs";
import HTMLRenderer from 'react-html-renderer'
import AdCard from "../components/cards/AdCard";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeUnlike from "../components/misc/LikeUnlike";
import ContactSeller from "../components/forms/ContactSeller";
dayjs.extend(relativeTime);

export default function AdView() {
  const [ad, setAd] = useState({});
  const [related, setRelated] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params?.slug) fetchAds();
  }, [params?.slug]);

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`ad/${params.slug}`);
      setAd(data.ad);
      setRelated(data.related);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-lg-4">
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary disabled mt-2">
                {ad?.type} for {ad?.action}
              </button>
              <LikeUnlike ad={ad} />
            </div>
            <div className="mt-4 mb-4">
              {ad?.sold ? "❌Off market" : "✅In market"}
            </div>
            <h1>{ad?.address}</h1>
            <AdFeatures ad={ad} />
            <h3 className="mt-5 h2">${formatNumber(ad?.price)}</h3>
            <p className="text-muted">{dayjs(ad?.createdAt).from()}</p>
          </div>
          <div className="col-lg-8">
            <ImageGallery />
          </div>
        </div>
      </div>
      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 mt-3 text-justify">
            <img
              src="https://developers.google.com/static/codelabs/maps-platform/maps-platform-101-react-js/img/98d12a994e12a2c1.png"
              alt="Google map"
              style={{ width: "100%", height: "350px", objectFit: "cover" }}
            />
            <h1>{ad?.type} in {ad?.address} for {ad?.action} ${ad.price}</h1>
            <AdFeatures ad={ad} />
            <hr/>
            <h3 className="fw-bold">{ad?.title}</h3>
            <HTMLRenderer html={ad?.description?.replaceAll(".", "<br/><br/>")} />
          </div>
        </div>
      </div>
      <div className="container">
        <ContactSeller ad={ad}/>
      </div>
      <div className="container">
         <h4 className="text-center">Related Properties</h4>
         <hr style={{width:"33%"}}/>
         <div className="row">
           {related?.map((ad)=> <AdCard key={ad._id} ad={ad}/>)}
         </div>
      </div>
    </>
  );
}
