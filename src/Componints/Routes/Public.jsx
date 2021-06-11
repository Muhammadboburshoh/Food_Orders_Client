import { Route } from "react-router-dom";

const Public = ({children, ...props}) => {

  return <Route {...props} render={() =>{

    return children

  }} />
}

export default Public