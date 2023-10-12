import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../../configs'
import { useMarket } from '../../context/MarketContext'
import { Link } from 'react-router-dom'
import { formatCurrency } from '@coingecko/cryptoformat'
import SupplyCap from '../shared/SupplyCap'

export default function MarketsList() {
  const { markets, setSelectedMarket } = useMarket()

  return (
    <div>
      <div className='flex flex-row items-center'>
        <h2 className='text-xl text-white'>
          Markets
        </h2>
      </div>

      <div className='bg-white rounded-xl p-4 mt-4'>
        {markets && markets.map((market) => {
          return (
            <div key={`${market.marketId}-${market.collateralId}`} tabIndex={0} className="collapse collapse-arrow border-b border-b-black/10 rounded-none text-black">
              <input type="checkbox" className="peer" />
              <div className="collapse-title">
                <div className='flex flex-row items-center gap-8'>
                  {/* Collateral Token */}
                  <div className='flex flex-row items-center gap-3 w-[20%]'>
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
                  <div className='flex flex-row items-center gap-3 w-[20%]'>
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
                  <div className='w-[20%]'>
                    <div className='text-black/60 text-sm'>
                      Total Supplied
                    </div>

                    <div className='flex flex-row items-center gap-2'>
                      <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
                        {formatCurrency(market.collateralStats.balanceUsd, "USD")}
                      </div>

                      <SupplyCap
                        supply={market.collateralStats.balance}
                        supplyCap={market.collateralStats.supplyCap}
                        supplyUsd={market.collateralStats.balanceUsd}
                        symbol={market.collateralToken.symbol}
                      />
                    </div>
                  </div>

                  {/* Pool Size */}
                  <div className='w-[20%]'>
                    <div className='text-black/60 text-sm'>
                      Reserves
                    </div>
                    <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
                      {formatCurrency(market.collateralStats.reservesUsd, "USD")}
                    </div>
                  </div>

                  {/* Liquidate Factor */}
                  <div className='mr-12 w-[15%]'>
                    <div className='text-black/60 text-sm'>
                      Liquidation Factor
                    </div>
                    <div>
                      {parseFloat(market.collateralStats.liquidateCollateralFactor).toFixed(2) * 100}%
                    </div>
                  </div>

                </div>
              </div>

              <div className="collapse-content">
                <div className='w-full flex flex-col'>
                  <Link
                    to={`/order?marketId=${market.marketId}&collateralId=${market.collateralId}`}
                    className='button-primary-light'
                  >
                    Bid
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
