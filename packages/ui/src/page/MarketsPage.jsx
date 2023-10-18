import React from 'react'
import MarketStats from '../components/markets/MarketStats'
import MarketsList from '../components/markets/MarketsList';

export default function MarketsPage() {

  return (
    <div className='container mx-auto px-4 animate-fade-up animate-ease-in-out'>
      <h1 className='text-white text-2xl text-center font-semibold'>
        Compound V3 Liquidation Stats 💦
      </h1>
      <p className='text-center text-white mt-1 text-sm'>
        Made with ❤️ for <a href='https://ethglobal.com/events/ethonline2023' target='_blank' rel='noreferrer'>ETHOnline 2023</a>
      </p>

      <div className='mt-8'>
        <MarketStats />
      </div>

      <div className='mt-8'>
        <MarketsList />
      </div>
    </div>
  )
}
