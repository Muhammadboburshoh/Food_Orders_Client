import { useEffect, useState } from "react";

import "./Products.css"
import { useCatigory } from "../../../../../Context/CategoryContext"
import useGet from "../../../../../Hooks/useGet"
import { useTable } from "../../../../../Context/TableContext"
import { useOrderBtn } from "../../../../../Context/OrderContext"
import Product from "./Product/Product"

function Products () {

  const [ page, setPage ] = useState(1)
  const [ categoryId ] = useCatigory()
  const [, setProductBtn] = useOrderBtn()

  // GET products
  const {data, error, loading} = useGet(`/products/${categoryId}/${page}`)
  // GET table number
  const { data: tables, error: tableErr, loading: tableLoading } = useGet(`/tables`)

  const [ tableId, setTableId ] = useTable(0)

  useEffect(() => {

    window.localStorage.setItem("tableId", tableId)

    if(tableId !== "null" && tableId !== null && tableId !== "0") {
      setProductBtn(false)
    } else {
      setProductBtn(true)
    }

  }, [tableId, setProductBtn])

  const tableChange = e => {
    setTableId(e.target.value)
  }

  useEffect(() => {
    setPage(1)

  }, [categoryId])

  return(
    <>
      <section className="products">
      <div className="container">
        <div className="table__wrapper">
            {
              tableLoading && <h1>Loading...</h1>
            }
            {
              tableErr && <h1>{String(tableErr.message)}</h1>
            }
            {
              !tableErr && !tableLoading && tables && (
                <select
                  value={tableId}
                  onChange={tableChange}
                  className="products__orders-table"
                >
                  <option value="0">O'tirgan stol raqamini tanlang:</option>
                  {
                    tables.map(t => (
                      <option
                        value={t.table_id}
                        key={Math.random()}
                      >
                        {t.table_number}-STOL
                      </option>
                    ))
                  }
                </select>
              )
            }

        </div>
          {
            loading && <h1>Loading...</h1>
          }
          {
            error && <h1>{String(error.message)}</h1>
          }
          {
            !error && !loading && data && (
              <ul className="products__list">
                {
                  data.map((p, i) => (
                    <Product name={{product: p, tableId: tableId}} key={i}/>
                  ))
                }
              </ul>
            )
          }

          <div className="products_btns">
            <button
              onClick={() => {
                if(page !== 1) {
                  setPage(page - 1)
                }
              }}
              className="carusel-btn left-btn"
            ></button>
            <button
              onClick={() => {
                  setPage(page + 1)
              }}
              className="carusel-btn right-btn"
            ></button>
          </div>
        </div>

      </section>
    </>
  )
}

export default Products