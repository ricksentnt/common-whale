import React, { useState } from 'react'

export default function BidDialog({
  selectedMarket
}) {
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
  return (
    <dialog id="bid_modal" className="modal">
      <div className="modal-box w-11/12 max-w-lg">
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

        <form method='dialog' className='mt-10'>
          <button className='button-primary-light'>
            Close
          </button>
        </form>
      </div>
    </dialog>

  )
}

const PlaceABid = ({
  selectedMarket
}) => {
  const [discountAmount, setDiscountAmount] = useState(3)

  return (
    <div>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-row items-center justify-between'>
          <div>
            <div className='text-sm opacity-60'>
              Collateral Asset
            </div>

            <div className='flex flex-row items-center mt-1'>
              <img src={selectedMarket.collateralToken.logo} alt={selectedMarket.collateralToken.symbol} className='w-8 h-8 rounded-full' />

              <div className='ml-2 text-lg'>
                {selectedMarket.collateralToken.symbol}
              </div>
            </div>
          </div>

          <div>
            <div className='flex flex-row items-center justify-between'>
              <div className='text-sm opacity-60'>
                Discount
              </div>

              <div className='text-sm font-semibold'>
                {discountAmount}%
              </div>

            </div>

            <input type="range" min={1} max={5} value={discountAmount} step={1}
              onChange={(event) => setDiscountAmount(event.target.value)}
              className="range range-xs range-primary mt-1"
            />
          </div>
        </div>

        <div>
          <div className='text-sm opacity-60'>
            Bid Denom
          </div>

          <div className='flex flex-row items-center'>
            <input type="number" placeholder="1000" className="input input-bordered flex-1 !border-black/10 rounded-l-lg rounded-r-none border-r-0" />

            <div className='flex flex-row items-center border border-black/10 px-4 rounded-r-lg h-12 bg-black/5'>
              <img src={selectedMarket.baseToken.logo} alt={selectedMarket.baseToken.symbol} className='w-6 h-6 rounded-full' />

              <div className='ml-2 text-sm font-semibold'>
                {selectedMarket.baseToken.symbol}
              </div>
            </div>
          </div>
        </div>

        <button className='button-primary'>
          Bid {selectedMarket.collateralToken.symbol}
        </button>
      </div>
    </div>
  )
}