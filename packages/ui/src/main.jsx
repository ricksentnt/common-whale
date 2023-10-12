import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/index.scss'

import { RouterProvider } from 'react-router-dom'
import { router } from './route/index';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <div className='bg-primary-950'>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
)
