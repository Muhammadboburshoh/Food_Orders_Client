import { Switch } from 'react-router-dom';

import './App.css';
import Public from './Componints/Routes/Public';
// import Public from '../Componints/Routes/Private';

import Home from "./Componints/Pages/Home/Home"; 


function App() {
  return (
    <>
      <Switch>
        <Public exact path="/">
          <Home />
        </Public>
      </Switch>
    </>
  )
}

export default App
