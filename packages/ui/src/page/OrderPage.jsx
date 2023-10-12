import React, { useEffect, useState } from 'react'
import PlaceABid from '../components/order/PlaceABid'
import { useMarket } from '../context/MarketContext'

export default function OrderPage() {
  const { markets, selectedMarket, setSelectedMarket } = useMarket()

  const TABS = [
    {
      id: 'bid',
      label: 'Place A Bid',
    },
    {
      id: 'my-bid',
      label: 'My Bids',
    }
  ]

  const [activeTab, setActiveTab] = useState('bid')

  useEffect(() => {
    if (!selectedMarket && markets) {
      setSelectedMarket(markets[0])
    }
  }, [markets, selectedMarket, setSelectedMarket])

  return (
    <div className='container mx-auto px-4'>
      <div className='relative z-10'>
        <h1 className='text-white text-2xl text-center font-semibold'>
          Place a Bid on Discounted Assets
        </h1>

        <div className='bg-white p-4 rounded-2xl max-w-lg mx-auto mt-10'>
          <div className="tabs">
            {TABS.map((tab) => {
              return (
                <a key={tab.id} className={`tab tab-bordered ${activeTab === tab.id ? 'tab-active !border-b-primary-400' : ''}`} onClick={() => setActiveTab(tab.id)}>
                  <span className='font-semibold'>
                    {tab.label}
                  </span>
                </a>
              )
            })}
          </div>

          {selectedMarket &&
            <div className='mt-8'>
              {activeTab === 'bid' &&
                <PlaceABid selectedMarket={selectedMarket} />
              }

              {activeTab === 'my-bid' &&
                <div>
                  MY BID
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}
