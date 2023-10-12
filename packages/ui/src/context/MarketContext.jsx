import { createContext, useContext, useEffect, useState } from "react"
import { backendUrl } from "../configs"
import axios from "axios"


const MarketContext = createContext({
  markets: [],
  selectedMarket: {},
  setSelectedMarket: () => { }
})

export const MarketProvider = ({
  children
}) => {
  const [markets, setMarkets] = useState([])
  const [selectedMarket, setSelectedMarket] = useState(null)

  const getMarkets = async () => {
    const res = await axios({
      url: backendUrl + '/api/data/markets'
    })
    console.log(res.data)
    setMarkets(res.data)
    // setSelectedMarket(res.data[0])
  }

  useEffect(() => {
    getMarkets()

    const interval = setInterval(() => {
      getMarkets()
    }, 10000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (markets.length > 0 && selectedMarket) {
      const updatedSelectedMarket = markets.find(m =>
        m.marketId === selectedMarket.marketId &&
        m.collateralId === selectedMarket.collateralId
      );

      if (updatedSelectedMarket) {
        setSelectedMarket(updatedSelectedMarket);
      }
    }
  }, [markets, selectedMarket]);

  return (
    <MarketContext.Provider value={{
      markets,
      selectedMarket,
      setSelectedMarket
    }}>
      {children}
    </MarketContext.Provider>
  )
}

export const useMarket = () => useContext(MarketContext)