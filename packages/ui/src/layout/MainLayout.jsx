
import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { MarketProvider } from '../context/MarketContext';

export default function MainLayout({ children }) {
  return (
    <MarketProvider>
      <div className='flex flex-col w-screen min-h-screen'>
        <Navbar />

        <div className='mt-12 pb-[20rem]'>
          <Outlet />
        </div>
      </div>
    </MarketProvider>
  )
}
