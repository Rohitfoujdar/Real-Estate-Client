import React from 'react'
import Sidebar from "../../../components/nav/Sidebar"
import AdForm from "../../../components/forms/AdForm"

export default function RentLand() {
  return (
    <div>
      <h3 className="display-1 bg-primary p-5 text-light">rent land</h3>
      <Sidebar/>
      <div className='container mt-2'>
        <AdForm action="Rent" type="Land"/>
      </div>
    </div>
  )
}
