import { useState, useContext, createContext } from "react";

const BasketContext = createContext()

const Provider = ({children}) => {

  const [ basketDisplay, setBasketDisplay ] = useState("d-none")

  return (
    <BasketContext.Provider value={{basketDisplay, setBasketDisplay}}>
      {children}
    </BasketContext.Provider>
  )
}

function useBasket () {
  const { basketDisplay, setBasketDisplay } = useContext(BasketContext)

  return [ basketDisplay, setBasketDisplay ]
}

export {
  Provider,
  useBasket
}