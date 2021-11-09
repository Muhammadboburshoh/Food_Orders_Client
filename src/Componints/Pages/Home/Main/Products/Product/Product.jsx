import { useEffect } from "react"

import { useOrderBtn } from "../../../../../../Context/OrderContext"
import { useOrder } from "../../../../../../Context/getOrdersContext"
import usePost from "../../../../../../Hooks/usePost"

function Product ({ name: {product, tableId} }) {

  const [ getOrder, setGetOrder ] = useOrder()
  const [ productBtn ] = useOrderBtn()
  let productCount = 1

  //Post order Product
  const { data: orderData, loading: orderLoading, error: orderError, post: orderPost, setData: setOrderData } = usePost("/order")

  let NEWORDER = document.getElementById("newElemen");

  useEffect(() => {

    if(orderData) {
      setOrderData(null)
      NEWORDER.textContent = "Savatchaga qo'shildi!"
      NEWORDER.classList.add("newOrder")
    }

    setTimeout(() => {
      if (NEWORDER) {
        NEWORDER.textContent = ""
        NEWORDER.classList.remove("newOrder")
      }

    }, 1500)

  }, [ orderData, orderLoading, orderError, NEWORDER, setOrderData ])

  useEffect(() => {
    if(orderData) {

      if(getOrder === 1) {
        setGetOrder(2)
      } else {
        setGetOrder(1)
      }
    }

  }, [orderData, getOrder, setGetOrder, setOrderData ])

  return (
    <>
      <li className="products__item">
        <img
        src={"http://localhost:3000/" + product.product_image}
        className="products__img"
        alt={product.product_name}
        width="250"
        height="250"
      />
      <h3 className="products__name">{product.product_name}</h3>
      <p className="products__price">{product.product_price - 0} SO'M</p>
      <div className="products__count-box">
        <label className="products__label" htmlFor="count">Nechta:</label>
        <input
          onChange={e =>{
            productCount = e.target.value.trim()
          }}
          defaultValue={productCount}
          name={product.product_name + Math.random()}
          id={product.product_name + Math.random()}
          className="products__count"
          type="number"
        />
      </div>
      <button
        disabled={productBtn}
        onClick={ () => {
          if(productCount > 0) {

            orderPost({
              productId: product.product_id,
              productCount: productCount,
              tableId: tableId
            })
          }
        }}
        className="products__order-btn"
      >Savatchaga qo'shish</button>
    </li>

    <div id="newElemen" className="d-none"></div>
    </>
  )
}

export default Product