import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import { Provider } from "./Context/CategoryContext"
import { Provider as BasketProvider } from "./Context/BasketContext"
import { Provider as TableProvider } from "./Context/TableContext"
import { Provider as GetOrdersContext } from "./Context/getOrdersContext"
import { Provider as OrderContext } from "./Context/OrderContext"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <BasketProvider>
          <TableProvider>
            <GetOrdersContext>
              <OrderContext>
                <App />
              </OrderContext>
            </GetOrdersContext>
          </TableProvider>
        </BasketProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
