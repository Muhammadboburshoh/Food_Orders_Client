import { useState, useContext, createContext } from "react";

const OrderContext = createContext()

const Provider = ({children}) => {

  const [ productBtn, setProductBtn ] = useState(false)

  return (
    <OrderContext.Provider value={{productBtn, setProductBtn}}>
      {children}
    </OrderContext.Provider>
  )
}

function useOrderBtn () {
  const { productBtn, setProductBtn } = useContext(OrderContext)

  return [ productBtn, setProductBtn ]
}

export {
  Provider,
  useOrderBtn
}