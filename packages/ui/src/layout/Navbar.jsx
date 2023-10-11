import React from 'react'

export default function Navbar() {
  const NAVIGATIONS = [
    {
      id: 'markets',
      label: 'Markets',
      href: '/markets',
    },
    {
      id: 'order',
      label: 'Order',
      href: '/order',
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      href: '/portfolio',
    }
  ]
  return (
    <div className='h-fit w-full'>
      <div className='container mx-auto p-4'>
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center gap--8'>
            <h1 className='text-2xl text-white font-semibold'>
              CommonWhale
            </h1>

            <div className='flex flex-row items-center gap-8 ml-12'>
              {NAVIGATIONS.map((navigation) => {
                const isActive = navigation.href === window.location.pathname
                return (
                  <button className={`${isActive ? 'button-primary-light' : 'btn btn-ghost text-primary-300'} !rounded-full !font-semibold !px-6 uppercase`} key={navigation.id}>
                    {navigation.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <button className='button-primary-light !rounded-full'>
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
