import React from 'react'
import Sidebar from "../../../components/nav/Sidebar"
import AdForm from "../../../components/forms/AdForm"

export default function SellLand() {
  return (
    <div>
      <h3 className="display-1 bg-primary p-5 text-light">Sell Land</h3>
      <Sidebar/>
      <div className='container mt-2'>
        <AdForm action="Sell" type="Land"/>
      </div>
    </div>
  )
}
