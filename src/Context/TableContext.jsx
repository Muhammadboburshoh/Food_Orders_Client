import { useState, useContext, createContext } from "react";

const TableContext = createContext()

const Provider = ({children}) => {

  let TABLEID = window.localStorage.getItem("tableId") || null

  const [ tableId, setTableId ] = useState(TABLEID || null)

  return (
    <TableContext.Provider value={{tableId, setTableId}}>
      {children}
    </TableContext.Provider>
  )
}

function useTable () {
  const { tableId, setTableId } = useContext(TableContext)

  return [ tableId, setTableId ]
}

export {
  Provider,
  useTable
}