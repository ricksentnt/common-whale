import React, { useEffect, useState } from 'react'
import { useMarket } from '../../context/MarketContext'
import MarketLabel from './MarketLabel'
import { useParams, useSearchParams } from 'react-router-dom'
import { formatCurrency } from '@coingecko/cryptoformat'

export default function PlaceABid() {
  const { markets, selectedMarket, setSelectedMarket } = useMarket()
  const [discountAmount, setDiscountAmount] = useState(3)

  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    const marketId = searchParams.get('marketId');
    const collateralId = searchParams.get('collateralId');

    if (marketId && collateralId) {
      const market = markets.find((market) => {
        return market.marketId === marketId && market.collateralId === collateralId;
      });

      if (market && (market.marketId !== selectedMarket?.marketId || market.collateralId !== selectedMarket?.collateralId)) {
        setSelectedMarket(market);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedMarket) {
      const currentMarketId = searchParams.get('marketId');
      const currentCollateralId = searchParams.get('collateralId');

      if (selectedMarket.marketId !== currentMarketId || selectedMarket.collateralId !== currentCollateralId) {
        setSearchParams({
          marketId: selectedMarket.marketId,
          collateralId: selectedMarket.collateralId,
        });
      }
    }
  }, [selectedMarket, searchParams]);

  const marketStats = [
    {
      id: 'total-supplied',
      label: 'Total Supplied',
      type: 'total-supplied',
      value: formatCurrency(selectedMarket?.collateralStats.balanceUsd, "USD"),
      supply: parseFloat(selectedMarket?.collateralStats.balance),
      supplyCap: parseFloat(selectedMarket?.collateralStats.supplyCap),
    },
    {
      id: 'collateral-factor',
      label: 'Collateral Factor',
      type: 'single',
      value: `${parseFloat(selectedMarket?.collateralStats.borrowCollateralFactor) * 100}%`,
    },
    {
      id: 'liquidation-factor',
      label: 'Liquidation Factor',
      type: 'single',
      value: `${parseFloat(selectedMarket?.collateralStats.liquidateCollateralFactor) * 100}%`,
    },
    {
      id: 'locked-collateral',
      label: 'Locked Collateral',
      type: 'double',
      value: formatCurrency(selectedMarket.collateralStats.balanceUsd, "USD"),
      value2: formatCurrency(parseFloat(selectedMarket.collateralStats.balance) / (10 ** selectedMarket.collateralToken.decimals), selectedMarket.collateralToken.symbol),
    },
    {
      id: 'reserves',
      label: 'Reserves',
      type: 'double',
      value: formatCurrency(selectedMarket.collateralStats.reservesUsd, "USD"),
      value2: formatCurrency(parseFloat(selectedMarket.collateralStats.reserves) / (10 ** selectedMarket.collateralToken.decimals), selectedMarket.collateralToken.symbol),
    },
  ]

  if (markets && selectedMarket) {
    return (
      <div>
        <div className='flex flex-col gap-8'>
          <div>
            <div className='text-sm opacity-60'>
              Select Market
            </div>

            <div id="closer" />

            <div className="dropdown dropdown-hover">
              <div tabIndex={0} className="border border-black/10 p-2 rounded-xl w-fit cursor-pointer">
                <MarketLabel
                  collateralLogo={selectedMarket.collateralToken.logo}
                  collateralSymbol={selectedMarket.collateralToken.symbol}
                  baseLogo={selectedMarket.baseToken.logo}
                  baseSymbol={selectedMarket.baseToken.symbol}
                />
              </div>
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-fit">
                {markets.map((market) => {
                  return (
                    <li key={`${market.marketId}-${market.collateralId}`}>
                      <a
                        onClick={() => setSelectedMarket(market)}
                      >
                        <MarketLabel
                          collateralLogo={market.collateralToken.logo}
                          collateralSymbol={market.collateralToken.symbol}
                          baseLogo={market.baseToken.logo}
                          baseSymbol={market.baseToken.symbol}
                        />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>


          <div className='flex flex-row items-center justify-between'>
            <div>
              <div className='text-sm opacity-60'>
                Collateral Asset
              </div>

              <div className='flex flex-row items-center mt-1'>
                <img src={selectedMarket.collateralToken.logo} alt={selectedMarket.collateralToken.symbol} className='w-8 h-8 rounded-full' />

                <div className='ml-2 text-lg flex flex-row gap-2'>
                  <span>
                    {selectedMarket.collateralToken.symbol}
                  </span>

                  <span className='opacity-40'>-</span>

                  <span className=''>
                    {formatCurrency(selectedMarket.collateralStats.lastPriceUsd, "USD")}
                  </span>
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

          {/* Compact Analytics */}
          <div className='border border-black/10 rounded-xl p-4 flex flex-col gap-3'>
            {marketStats.map((stat) => {
              if (stat.type === 'single') {
                return (
                  <div key={stat.id} className='flex flex-row items-center justify-between'>
                    <div className='text-sm'>
                      {stat.label}
                    </div>

                    <div className='font-medium text-sm'>
                      {stat.value}
                    </div>
                  </div>
                )
              }

              if (stat.type === 'double') {
                return (
                  <div key={stat.id} className='flex flex-row items-center justify-between'>
                    <div className='text-sm'>
                      {stat.label}
                    </div>

                    <div className='text-right'>
                      <div className='font-medium text-sm'>
                        {stat.value}
                      </div>
                      <div className='text-xs opacity-60'>
                        {stat.value2}
                      </div>
                    </div>
                  </div>
                )
              }

              if (stat.type === 'total-supplied') {
                return (
                  <div key={stat.id} className='flex flex-row items-center justify-between'>
                    <div className='text-sm'>
                      {stat.label}
                    </div>

                    <div className='flex flex-row items-center gap-2'>
                      <div className='font-medium text-sm'>
                        {stat.value}
                      </div>

                      <div className="radial-progress text-primary" style={{ "--value": (stat.supply / stat.supplyCap) * 100, "--size": '1.2rem', "--thickness": '3px' }} />
                    </div>
                  </div>
                )
              }
            })}

            <button className='button-primary-soft'>
              More Analytics
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='text-center'>
      Loading...
    </div>
  )
}
