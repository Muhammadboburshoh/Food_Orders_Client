import { useCatigory } from "../../../../../Context/CategoryContext"

function Products () {

  const [ categoryId ] = useCatigory()
  console.log(categoryId);

  return(
    <>
      Products
    </>
  )
}

export default Products