import React from 'react'
import Sidebar from "../../../components/nav/Sidebar"
import AdForm from "../../../components/forms/AdForm"

export default function RentHouse() {
  return (
    <div>
      <h3 className="display-1 bg-primary p-5 text-light">Rent House</h3>
      <Sidebar/>
      <div className='container mt-2'>
        <AdForm action="Rent" type="House"/>
      </div>
    </div>
  )
}
