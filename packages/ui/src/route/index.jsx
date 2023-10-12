import { Navigate, createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";

import MarketsPage from "../page/MarketsPage";
import OrderPage from "../page/OrderPage";
import PortfolioPage from "../page/PortfolioPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='/markets' />
      },
      {
        path: 'markets',
        element: <MarketsPage />
      },
      {
        path: 'order',
        element: <OrderPage />
      },
      {
        path: 'portfolio',
        element: <PortfolioPage />
      }
    ]
  }
])