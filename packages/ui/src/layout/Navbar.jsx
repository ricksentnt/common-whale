import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
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
            <img src="/logo-horizontal.svg" alt="CommonWhale" className='w-[14rem]' />

            <div className='flex flex-row items-center gap-8 ml-16'>
              {NAVIGATIONS.map((navigation) => {
                const isActive = location.pathname === navigation.href

                return (
                  <Link to={navigation.href} className={`${isActive ? 'button-primary-light' : 'btn btn-ghost text-primary-300'} !rounded-full !font-semibold !px-6 capitalize`} key={navigation.id}>
                    {navigation.label}
                  </Link>
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
