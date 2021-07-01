import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import { Provider } from "./Context/CategoryContext"
import { Provider as BasketProvider } from "./Context/BasketContext"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <BasketProvider>
          <App />
        </BasketProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
