
import React from 'react'
import Navbar from './Navbar'

export default function MainLayout({ children }) {
  return (
    <div className='flex flex-col w-screen h-screen bg-primary-950'>
      <Navbar />

      <div>
        {children}
      </div>
    </div>
  )
}
