import "./Products.css"
import { useCatigory } from "../../../../../Context/CategoryContext"
import useGet from "../../../../../Hooks/useGet";

function Products () {

  const [ categoryId ] = useCatigory()

  const {data, error, loading} = useGet(`/products/${categoryId}`)

  return(
    <>
      <section className="products">
        <div className="container">
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
                      {console.log(p)}
                      <img
                        /*src={"http://localhost:4000/" + p.product_image}*/
                        className="products__img"
                        src="https://picsum.photos/id/156/250/250"
                        alt={p.product_name}
                        width="250"
                        height="250"
                      />
                      <h3 className="products__name">{p.product_name}</h3>
                      <p className="products__price">{p.product_price} SO'M</p>
                      <div className="products__count-box">
                        <label className="products__label" htmlFor="count">Nechta:</label>
                        <input
                        defaultValue={1}
                          id="count"
                          className="products__count"
                          type="number"
                        />
                      </div>
                      <button
                        className="products__order-btn"
                      >+</button>
                    </li>
                  ))
                }
              </ul>
            )
          }

          <button
            className="products__orders"
          >Buyurtma berish</button>
        </div>
      </section>
    </>
  )
}

export default Products