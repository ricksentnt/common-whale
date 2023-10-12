import React from 'react'

export default function MarketLabel({
  collateralLogo,
  collateralSymbol,
  baseLogo,
  baseSymbol
}) {
  return (
    <div className='flex w-full flex-row items-center gap-4'>
      <div className='flex flex-row items-center gap-2 w-[5rem] justify-center'>
        <img src={collateralLogo} alt={collateralSymbol} className='w-6 h-6 rounded-full' />
        <div>
          <div className='text-sm'>
            {collateralSymbol}
          </div>
        </div>
      </div>

      <div className='opacity-60'>
        -
      </div>

      <div className='flex flex-row items-center gap-2 w-[5rem] justify-center'>
        <img src={baseLogo} alt={baseSymbol} className='w-6 h-6 rounded-full' />
        <div>
          <div className='text-sm'>
            {baseSymbol}
          </div>
        </div>
      </div>
    </div>
  )
}
