import { useEffect } from "react"

import "./Basket.css"
import basketImg from ".././../../Images/basket.png"
import { useBasket } from "../../../Context/BasketContext"
import useGet from "../../../Hooks/useGet"

function Basket() {
  let tableId = window.localStorage.getItem("tableId")

  
  useEffect(() => {
    // tableId = window.localStorage.getItem("tableId")
    // window.location.reload("/")
    console.log("ab");
  }, [tableId])
  
  var { data, loading, error } = useGet(`/order/new/${tableId}`)

  const [ basketDisplay, setBasketDisplay ] = useBasket()
  return (
    <>
      <section className={`${basketDisplay} backet`}>
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
              !loading && !error && data && (
                
                <table>
                  {
                    console.log(data)
                  }
                  <thead>
                  <tr>
                    <th>Mahsulot</th>
                    <th>Nechta</th>
                    <th>Narxi</th>
                  </tr>
                  </thead>
                  <tbody>
                    
                      {
                        data.product.map(( p, i ) => (
                          <tr key={Math.random()}>
                            <td key={Math.random()}>{p}</td>
                            <td key={Math.random()}>{data.count[i]}</td>
                            <td key={Math.random()}>{data.price[i]}</td>
                          </tr>
                        ))
                      }

                    
                    {/* <tr>
                      <td>Eve</td>
                      <td>Jackson</td>
                      <td>94</td>
                    </tr>
                    <tr>
                      <td>John</td>
                      <td>Doe</td>
                      <td>80</td>
                    </tr> */}
                  </tbody>
              </table>
              )
            }
          </main>
          <button className="basket__btn">Buyurtma berish</button>
        </div>
      </section>
    </>
  )
}

export default Basket