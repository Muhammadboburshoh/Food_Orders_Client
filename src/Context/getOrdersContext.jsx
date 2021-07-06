import { useState, useContext, createContext } from "react";

const OrdersContext = createContext()

const Provider = ({children}) => {

  const [ getOrder, setGetOrder ] = useState(1)

  return (
    <OrdersContext.Provider value={{getOrder, setGetOrder}}>
      {children}
    </OrdersContext.Provider>
  )
}

function useOrder () {
  const { getOrder, setGetOrder } = useContext(OrdersContext)

  return [ getOrder, setGetOrder ]
}

export {
  Provider,
  useOrder
}