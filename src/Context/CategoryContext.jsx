import { useState, useEffect, useContext, createContext } from "react";

const CatigoryContext = createContext()

const Provider = ({children}) => {

  const [ categoryId, setCategoryId ] = useState(1)

  return (
    <CatigoryContext.Provider value={{categoryId, setCategoryId}}>
      {children}
    </CatigoryContext.Provider>
  )
}

function useCatigory () {
  const { categoryId, setCategoryId } = useContext(CatigoryContext)

  return [ categoryId, setCategoryId ]
}

export {
  Provider,
  useCatigory
}