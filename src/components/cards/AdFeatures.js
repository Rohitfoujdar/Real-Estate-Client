import React from 'react'
import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { BiArea } from "react-icons/bi";

export default function AdFeatures({ad}) {
  return (
    <div>
          <p className="card-text d-flex justify-content-between">
                {ad?.bedrooms ? (
                  <span>
                    <IoBedOutline /> {ad?.bedrooms}
                  </span>
                ) : (
                  ""
                )}
                {ad?.bathrooms ? (
                  <span>
                    <TbBath /> {ad?.bathrooms}
                  </span>
                ) : (
                  ""
                )}
                {ad?.landsize ? (
                  <span>
                    <BiArea /> {ad?.landsize}
                  </span>
                ) : (
                  ""
                )}
              </p>
    </div>
  )
}
