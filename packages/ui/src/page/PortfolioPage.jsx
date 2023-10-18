import React from 'react'
import ComethButton from '../components/ComethButton'
import ComethBurnerWalletFlow from '../components/ComethBurnerWalletFlow'
import ComethCengliDemo from '../components/ComethCengliDemo'

export default function PortfolioPage() {

  return (
    <div className='container mx-auto px-4 animate-fade-up animate-ease-in-out'>
      <h1 className='text-white text-2xl text-center font-semibold'>
        Cometh Testing
      </h1>

      {/* <div className='mt-10'>
        <ComethButton />
      </div> */}

      <div className='mt-10'>
        <ComethBurnerWalletFlow />
      </div>


      <div className='mt-10'>
        <ComethCengliDemo />
      </div>
    </div>
  )
}
