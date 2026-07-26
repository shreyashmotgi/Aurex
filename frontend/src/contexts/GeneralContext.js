import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import BuyActionWindow from "../dashboard/BuyActionWindow";
import SellActionWindow from "../dashboard/SellActionWindow";

const GeneralContext = createContext({
  openBuyWindow: () => {},
  closeBuyWindow: () => {},
  openSellWindow: () => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = ({ children }) => {

  const [buyStock, setBuyStock] = useState(null);
  const [sellStock, setSellStock] = useState(null);

  // BUY

  const openBuyWindow = useCallback((stock) => {
    setBuyStock(stock);
  }, []);

  const closeBuyWindow = useCallback(() => {
    setBuyStock(null);
  }, []);

  // SELL

  const openSellWindow = useCallback((stock) => {
    setSellStock(stock);
  }, []);

  const closeSellWindow = useCallback(() => {
    setSellStock(null);
  }, []);

  const value = useMemo(
    () => ({
      openBuyWindow,
      closeBuyWindow,
      openSellWindow,
      closeSellWindow,
    }),
    [
      openBuyWindow,
      closeBuyWindow,
      openSellWindow,
      closeSellWindow,
    ]
  );

  return (
    <GeneralContext.Provider value={value}>

      {children}

      {buyStock && (
        <BuyActionWindow stock={buyStock} />
      )}

      {sellStock && (
        <SellActionWindow stock={sellStock} />
      )}

    </GeneralContext.Provider>
  );
};

export default GeneralContext;