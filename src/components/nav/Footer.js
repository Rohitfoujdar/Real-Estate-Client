import React from 'react'

export default function Footer() {
  return (
    <div className='text-center bg-dark p-4 mt-4 text-light'>
      <h4 className='mt-4'>Realist app - Buy Sell or Rent Properties</h4>
      <p className='mt-3'>
        &copy; {new Date().getFullYear()} All rights reserved
      </p>
    </div>
  )
}
