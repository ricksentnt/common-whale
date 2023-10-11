import React from 'react'

export default function MarketsPage() {
  const STATS = [
    {
      id: '1',
      label: 'Total Liquidations',
      value: '1,234',
    },
    {
      id: '2',
      label: 'Total Liquidations',
      value: '1,234',
    },
    {
      id: '3',
      label: 'Total Liquidations',
      value: '1,234',
    },
  ]
  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-white text-2xl text-center font-semibold'>
        Compound V3 Liquidation Stats 💦
      </h1>

      <div className='grid grid-cols-12 gap-8 mt-8'>
        {STATS.map((stat) => {
          return(
            <div className='bg-primary-50 rounded-xl p-6 col-span-4 text-primary-950' key={stat.id}>
              <div>
                {stat.label}
              </div>
              <div className='text-3xl font-bold mt-2'>
                {stat.value}
              </div>
            </div>
          )
        })}
      </div>


    </div>
  )
}
