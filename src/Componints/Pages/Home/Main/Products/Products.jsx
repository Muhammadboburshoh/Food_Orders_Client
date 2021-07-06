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

  // POST order
  const { data: orderData, loading: orderLoading, error: orderError, post: orderPost } = usePost("/order")
  // GET products
  const {data, error, loading} = useGet(`/products/${categoryId}/${page}`)
  // GET table number
  const { data: tables, error: tableErr, loading: tableLoading } = useGet(`/tables`)

  const [ tableId, setTableId ] = useTable()
  let productCount = 1

  
  let NEWORDER = document.getElementById("newElemen");
  useEffect(() => {

    window.localStorage.setItem("tableId", tableId)

    if(orderData) {
      NEWORDER.textContent = "New Order"
      NEWORDER.classList.add("newOrder")
    }

    setTimeout(() => {

      if (NEWORDER) {
        NEWORDER.textContent = ""
        NEWORDER.classList.remove("newOrder")
      }

    }, 1500)


  }, [tableId, orderData, orderLoading, orderError, NEWORDER])


  const tableChange = e => {
    setTableId(e.target.value)
  }

  let tableNum
  if(tableId && tables) {
    tableNum = tables.find(t => (t.table_id -0) === (tableId - 0))
  }

  useEffect(() => {

    if(getOrder === 1) {
      setGetOrder(2)
    } else {
      setGetOrder(1)
    }

  }, [orderData])

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
                  onChange={tableChange}
                  defaultValue={tableId}
                  className="products__orders-table"
                >
                  <option value="">O'tirgan stol raqamini tanlang:</option>
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

            {
              tableNum && <span className="table_number">Siz {tableNum.table_number}-stolni tanladingiz!</span>
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
                        /*src={"http://localhost:4000/" + p.product_image}*/
                        src="https://picsum.photos/id/156/250/250"
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
                          name={'name' + Math.random()}
                          id={'name' + Math.random()}
                          className="products__count"
                          type="number"
                        />
                      </div>
                      <button
                        onClick={ () => {
                          orderPost({
                            productId: p.product_id,
                            productCount: productCount,
                            tableId: tableId
                          })
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