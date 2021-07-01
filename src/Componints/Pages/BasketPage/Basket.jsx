import "./Basket.css"
import basketImg from ".././../../Images/basket.png"
import { useBasket } from "../../../Context/BasketContext"

function Basket() {

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
            
          </main>
          <button className="basket__btn">Buyurtma berish</button>
        </div>
      </section>
    </>
  )
}

export default Basket