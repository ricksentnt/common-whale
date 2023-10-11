import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../../configs'
import BidDialog from './BidDialog';

export default function MarketsList() {
  const [markets, setMarkets] = useState()

  const getMarkets = async () => {
    const res = await axios({
      url: backendUrl + '/api/data/markets'
    })
    console.log(res.data)
    setMarkets(res.data)
    setSelectedMarket(res.data[0])
  }

  useEffect(() => {
    getMarkets()

    const interval = setInterval(() => {
      getMarkets()
    }, 15000);

    document.getElementById('bid_modal').showModal()

    return () => clearInterval(interval);
  }, []);

  const [selectedMarket, setSelectedMarket] = useState()

  return (
    <div>
      <div className='flex flex-row items-center'>
        <h2 className='text-xl text-white'>
          Markets
        </h2>
      </div>

      <BidDialog selectedMarket={selectedMarket} />

      <div className='bg-white rounded-xl p-4 mt-4'>
        {markets && markets.map((market) => {
          return (
            <div key={`${market.marketId}-${market.collateralId}`} tabIndex={0} className="collapse collapse-arrow border-b border-b-black/10 rounded-none text-black">
              <input type="checkbox" className="peer" />
              <div className="collapse-title">
                <div className='flex flex-row items-center gap-8 justify-between'>
                  {/* Collateral Token */}
                  <div className='flex flex-row items-center gap-3'>
                    <img src={market.collateralToken.logo} alt={market.collateralToken.symbol} className='w-8 h-8 rounded-full' />
                    <div>
                      <div className='text-black/60 text-sm'>
                        Collateral
                      </div>
                      <div>
                        {market.collateralToken.symbol}
                      </div>
                    </div>
                  </div>

                  {/* Bid Denom/Base Token */}
                  <div className='flex flex-row items-center gap-3'>
                    <img src={market.baseToken.logo} alt={market.baseToken.symbol} className='w-8 h-8 rounded-full' />
                    <div>
                      <div className='text-black/60 text-sm'>
                        Bid Denom
                      </div>
                      <div>
                        {market.baseToken.symbol}
                      </div>
                    </div>
                  </div>

                  {/* TVL */}
                  <div>
                    <div className='text-black/60 text-sm'>
                      TVL
                    </div>
                    <div className='max-w-[6rem] overflow-hidden text-ellipsis whitespace-nowrap'>
                      {market.collateralStats?.balanceUsd}
                    </div>
                  </div>

                  {/* Pool Size */}
                  <div>
                    <div className='text-black/60 text-sm'>
                      Pool Size
                    </div>
                    <div className='max-w-[6rem] overflow-hidden text-ellipsis whitespace-nowrap'>
                      {market.collateralStats?.balanceUsd}
                    </div>
                  </div>

                  {/* Liquidate Factor */}
                  <div className='mr-12'>
                    <div className='text-black/60 text-sm'>
                      Liquidation Factor
                    </div>
                    <div className='max-w-[6rem] overflow-hidden text-ellipsis whitespace-nowrap'>
                      {parseFloat(market.collateralStats.liquidationFactor).toFixed(2) * 100}%
                    </div>
                  </div>

                </div>
              </div>

              <div className="collapse-content">
                <div className='w-full flex flex-col'>
                  <button
                    onClick={() => {
                      document.getElementById('bid_modal').showModal()
                      setSelectedMarket(market)
                    }}
                    className='button-primary-light'>
                    Bid
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
