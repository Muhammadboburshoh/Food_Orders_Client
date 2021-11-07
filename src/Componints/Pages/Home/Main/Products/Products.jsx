import { useEffect, useState } from "react";

import "./Products.css"
import { useCatigory } from "../../../../../Context/CategoryContext"
import useGet from "../../../../../Hooks/useGet";
import usePost from "../../../../../Hooks/usePost"
import { useTable } from "../../../../../Context/TableContext"
import { useOrder } from "../../../../../Context/getOrdersContext"

function Products () {

  const [ getOrder, setGetOrder ] = useOrder()

  const [ page, setPage ] = useState(1)
  const [ categoryId ] = useCatigory()

  const [productBtn, setProductBtn] = useState(false)

  // POST order
  const { data: orderData, loading: orderLoading, error: orderError, post: orderPost, setData: setOrderData } = usePost("/order")
  // GET products
  const {data, error, loading} = useGet(`/products/${categoryId}/${page}`)
  // GET table number
  const { data: tables, error: tableErr, loading: tableLoading } = useGet(`/tables`)

  const [ tableId, setTableId ] = useTable(0)
  let productCount = 1

  let NEWORDER = document.getElementById("newElemen");

  useEffect(() => {

    window.localStorage.setItem("tableId", tableId)

    if(orderData) {
      setOrderData(null)
      NEWORDER.textContent = "Savatchaga qo'shildi!"
      NEWORDER.classList.add("newOrder")
    }

    setTimeout(() => {

      if (NEWORDER) {
        NEWORDER.textContent = ""
        NEWORDER.classList.remove("newOrder")
      }

    }, 1500)

    if(tableId !== "null" && tableId !== null && tableId !== "0") {
      setProductBtn(false)
    } else {
      setProductBtn(true)
    }

  }, [tableId, orderData, orderLoading, orderError, NEWORDER, setOrderData])


  const tableChange = e => {
    setTableId(e.target.value)
  }

  useEffect(() => {
    if(orderData) {

      if(getOrder === 1) {
        setGetOrder(2)
      } else {
        setGetOrder(1)
      }
    }

  }, [orderData, getOrder, setGetOrder, setOrderData ])


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
                  data.map(p => (
                    <li key={Math.random()} className="products__item">
                      <img
                        src={"http://localhost:3000/" + p.product_image}
                        className="products__img"
                        alt={p.product_name}
                        width="250"
                        height="250"
                      />
                      <h3 className="products__name">{p.product_name}</h3>
                      <p className="products__price">{p.product_price - 0} SO'M</p>
                      <div className="products__count-box">
                        <label className="products__label" htmlFor="count">Nechta:</label>
                        <input
                          onChange={e =>{
                            productCount = e.target.value.trim();
                          }}
                          defaultValue={1}
                          name={p.product_name}
                          id={'name' + Math.random()}
                          className="products__count"
                          type="number"
                        />
                      </div>
                      <button
                        disabled={productBtn}
                        onClick={ () => {
                          if(productCount > 0) {

                            orderPost({
                              productId: p.product_id,
                              productCount: productCount,
                              tableId: tableId
                            })
                          }
                        }}
                        className="products__order-btn"
                      >Savatchaga qo'shish</button>
                    </li>
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


          <div id="newElemen" className="d-none"></div>

      </section>
    </>
  )
}

export default Products