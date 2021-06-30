import "./Products.css"
import { useCatigory } from "../../../../../Context/CategoryContext"
import useGet from "../../../../../Hooks/useGet";

/* import leftBtn from "../../../../../Images/left-btn"
import right from "../../../../../Images/right-btn" */

function Products () {

  const [ categoryId ] = useCatigory()

  const {data, error, loading} = useGet(`/products/${categoryId}`)

  const { data: tables, error: tableErr, loading: tableLoading } = useGet(`/tables`)

  return(
    <>
      <section className="products">

            {
              tableLoading && <h1>Loading...</h1>
            }
            {
              tableErr && <h1>{String(tableErr.message)}</h1>
            }
            {
              !tableErr && !tableLoading && tables && (
                <select className="products__orders-table">
                  {
                    tables.map(t => <option  key={Math.random()} value={t.id}>{t.table_number}-Stol</option>)
                  }
                </select>
              )
            }
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
                      >Savatchaga qo'shish</button>
                    </li>
                  ))
                }
              </ul>
            )
          }

          <div className="products_btns">
            <button className="carusel-btn left-btn"></button>
            <button className="carusel-btn right-btn"></button>
          </div>
          {/* <div className="products_btns">
          <button
            className="products__orders"
          >Buyurtma berish</button>
          </div> */}
        </div>
      </section>
    </>
  )
}

export default Products