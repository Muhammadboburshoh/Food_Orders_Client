import { useCatigory } from "../../../../Context/CategoryContext"

import "./Main.css"
import useGet from "../../../../Hooks/useGet"
import Products from "./Products/Products"

function Main () {

  const { loading, error, data } = useGet('/categories')


  const [ categoryId, setCategoryId ] = useCatigory()


  return (
    <>
      <main className="main">
        <div className="container main__container">
          {
            loading && <h2>Loading...</h2>
          }
          {
            error && <h2>{String(error.message)}</h2>
          }
          {
            !error && !loading && data && (

              <div className="main__categories">
                {
                  data.map(c => (
                    <button
                      onClick={() => setCategoryId(c.category_id)}
                      key={Math.random()}
                      className="categorie"
                    >{c.category_name}</button>
                  ))
                }
              </div>

            )
          }
        </div>

        <Products />
      </main>
    </>
  )
}

export default Main