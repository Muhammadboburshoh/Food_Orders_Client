import "./Main.css"
import useGet from "../../../../Hooks/useGet"

function Main () {

  const { loading, error, data } = useGet('/categories')

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
                      key={Math.random()}
                      className="categorie"
                    >{c.category_name}</button>
                  ))
                }
              </div>

            )
          }
        </div>
      </main>
    </>
  )
}

export default Main