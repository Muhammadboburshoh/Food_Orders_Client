import { useState, useEffect } from "react"

import "./Basket.css"
import basketImg from ".././../../Images/basket.png"
import { useBasket } from "../../../Context/BasketContext"
// import useGet from "../../../Hooks/useGet"
import { useTable } from "../../../Context/TableContext"
import useDelete from "../../../Hooks/useDelete"

function Basket() {
  const [ loading, setLoading ] = useState(false)
  const [ data, setData ] = useState(null)
  const [ error, setError ] = useState(null)

  const [ delError, setDelError ] = useState(null)
  const [ delData, setDelData ] = useState(null)
  const [ delLoading, setDelLoading ] = useState(false)

  let price = 0

  const [ tableId ] = useTable()

  // var { data, loading } = useGet(`/order/${tableId}`)

  // const { data: delData, error: delError, loading: delLoading }= useDelete(`/order/${tableId}`)

  const [ itemId, setItemId ] = useState(0)



  useEffect(() => {

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

  }, [tableId, itemId])

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
                !loading && data && (
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


            </main> 
            <button className="basket__btn">Buyurtma berish</button>
          </div>
        </section>
      </div>
      
    </section>
  )
}

export default Basket