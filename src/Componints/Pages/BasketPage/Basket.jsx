import { useState, useEffect } from "react"

import "./Basket.css"
import basketImg from ".././../../Images/basket.png"
import { useBasket } from "../../../Context/BasketContext"
import { useTable } from "../../../Context/TableContext"
import { useOrder } from "../../../Context/getOrdersContext"


function Basket() {
  const [ loading, setLoading ] = useState(false)
  const [ data, setData ] = useState(null)
  const [ error, setError ] = useState(null)

  const [ delError, setDelError ] = useState(null)
  const [ delData, setDelData ] = useState(null)
  const [ delLoading, setDelLoading ] = useState(false)

  const [ orderData , setOrderData ] = useState(null)
  const [ orderLoading , setOrderLoading ] = useState(false)
  const [ orderError , setOrderError ] = useState(null)

  const [ getOrder ] = useOrder()
  
  let price = 0

  const [ tableId ] = useTable()

  const [ itemId, setItemId ] = useState(0)
  const [ order, setOrder ] = useState(false)


  useEffect(() => {

    if(tableId !== "null" && tableId !== null) {

      ;(async () => {
  
        try {
          setLoading(false)
  
          const response = await fetch(`http://localhost:3000/order/${tableId}`)
  
          const json = await response.json()
          if(json) {
            setLoading(false)
            setData(json)
          }
  
        } catch(e) {
          setLoading(false)
          setError(e)
        }
  
      })()
    }

  }, [tableId, itemId, delError, delData, delLoading, getOrder, order])


  useEffect(() => {

    ;(async () => {

      if(itemId > 0) {

        try {
          setDelLoading(false)
  
          const response = await fetch(`http://localhost:3000/order/${itemId}`, {
            method: "DELETE",
            headers : {
              "Content-Type": "application/json"
            }
          })
  
          const json = await response.json()
          if(json) {
            setDelLoading(false)
            setDelData(json)
            setItemId(0)
          }
  
        } catch(e) {
          setDelLoading(false)
          setDelError(e)
        }
      } 


    })()

  }, [itemId])

  useEffect(() => {

    ;(async() => {

      if(order) {

        try {
          setOrderLoading(true)
  
          const response = await fetch("http://localhost:3000/order/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({tableId})
          })

          if(response.status >= 200 && response.status <= 299) {
            setOrderLoading(false)
            setOrderData(await response.json())
            setOrder(false)
          }
        } catch(e) {
          setOrderLoading(false)
          setOrderError(e)
        }
      }


    })()
  }, [order, tableId])


  let NEWORDER = document.getElementById("big_order")

  useEffect(() => {

    if(orderData) {
      // NEWORDER.textContent = "Buyurtma berildi"
      NEWORDER.classList.add("big_order")
      NEWORDER.classList.remove("d-none")
    } else {
    }

    setTimeout(() => {

      if (NEWORDER) {
        // NEWORDER.textContent = ""
        NEWORDER.classList.remove("big_order")
        NEWORDER.classList.add("d-none")
      }

    }, 1500)


  }, [ orderData, NEWORDER, orderLoading, orderError])

  const [ orderBtn, setOrderBtn ] = useState(true)

  useEffect(()=> {

    if(data) {

      if(data.length) {
        setOrderBtn(false)
      } else {
        setOrderBtn(true)
      }
    } else {
      setOrderBtn(true)
    }

  }, [data])

  const [ basketDisplay, setBasketDisplay ] = useBasket()
  return (
    <section className={`${basketDisplay} all-backet`}>
      <div
        className="no-content"
        onClick={() => {
          if(!basketDisplay) {
            setBasketDisplay("d-none")
          }
        }}
      ></div>
      <div className="backet-content">
        <section className="backet">
          <div className="backet__container">
            <div className="basket__header">
              <img width="50" height="50" src={basketImg} alt="" />
              <h2 className="basket__heading">Savatcha</h2>
              <button
                onClick={() => {
                  if(!basketDisplay) {
                    setBasketDisplay("d-none")
                  }
                }} 
                className="close_button"
              ></button>
            </div>

            <main className="basket__main">
              {
                loading && <h1>Loading...</h1>
              }
              {
                error && <h1>{String}</h1>
              }
              {
                !loading && data && !error && (
                  <>
                    <table>
                      <thead>
                        <tr>
                          <th>Nomi</th>
                          <th>Nechta</th>
                          <th>Narxi</th>
                          <th>DEL</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.map(d => (
                            <tr key={Math.random()}>
                              <td>{d.product_name}</td>
                              <td>{d.product_count}</td>
                              <td>{(d.product_count - 0) * (d.product_price - 0)}</td>
                              <td
                                className="delete_btn"
                                onClick={() =>{
                                  setItemId(d.item_id)
                                }}
                              ></td>
                              <td className="d-none">{price += (d.product_count - 0) * (d.product_price - 0)}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>

                    {
                      price && (
                        <div className="price">
                          <span>Jami: </span>
                          <span>{price} so'm</span>
                        </div>
                      )
                    }
                  </>
                )
              } 

              <h1
                id="big_order"
                className="d-none"
              >Buyurtma berildi!</h1>

            </main> 
            <button
              disabled={orderBtn}
              className="basket__btn"
              onClick={() => {
                setOrder(true)
              }}
            >Buyurtma berish</button>
          </div>
        </section>
      </div>
      
    </section>
  )
}

export default Basket