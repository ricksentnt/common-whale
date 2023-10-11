import React from 'react'
import MarketStats from '../components/markets/MarketStats'
import MarketsList from '../components/markets/MarketsList';

export default function MarketsPage() {

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-white text-2xl text-center font-semibold'>
        Compound V3 Liquidation Stats 💦
      </h1>

      <div className='mt-8'>
        <MarketStats />
      </div>

      <div className='mt-8'>
        <MarketsList />
      </div>
    </div>
  )
}
