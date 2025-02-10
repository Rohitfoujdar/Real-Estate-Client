import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import axios from 'axios';
import AdCard from '../components/cards/AdCard';

export default function Home() {
  //context
  const [auth, setAuth] = useAuth();
  //useState
const[adsForSell, setAdsForSell]=useState();
const[adsForRent, setAdsForRent]=useState()

useEffect(()=>{
    fetchAds()
},[])

const fetchAds = async() =>{
  try{
   const {data} = await axios.get("ads");
   setAdsForSell(data.adsForSell)
   setAdsForRent(data.adsForRent)
  }catch(err){
     console.log(err)
  }
}
  return (
    <div>
      <h3 className="display-1 bg-primary p-5 text-light">For Sell</h3>
      <div className="container">
        <div className="row">
            {adsForSell?.map((ad)=>(
               <AdCard   ad={ad} key={ad._id}/>
            ))}
        </div>
      </div>
      <h3 className="display-1 bg-primary p-5 text-light">For Rent</h3>
      <div className="container">
        <div className="row">
            {adsForRent?.map((ad)=>(
               <AdCard   ad={ad} key={ad._id}/>
            ))}
        </div>
      </div>
    </div>
  )
}
