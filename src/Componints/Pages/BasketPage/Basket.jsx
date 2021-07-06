import "./Basket.css"
import basketImg from ".././../../Images/basket.png"
import { useBasket } from "../../../Context/BasketContext"
import useGet from "../../../Hooks/useGet"
import { useTable } from "../../../Context/TableContext"

function Basket() {
  let price = 0

  const [ tableId ] = useTable()
  
  var { data, loading } = useGet(`/order/${tableId}`)
  console.log(data);

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
              !loading && data && (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data.map(d => (
                          <tr key={Math.random()}>
                            <td>{d.product_name}</td>
                            <td>{d.product_count}</td>
                            <td>{(d.product_count - 0) * (d.product_price - 0)}</td>
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
    </>
  )
}

export default Basket