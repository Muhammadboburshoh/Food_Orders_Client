import { useEffect, useState } from "react"


const serviseURL = 'http://localhost:3000'

const usePost = (path) => {


  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ data, setData] = useState(null)
  const [ body, setBody] = useState(null)

  useEffect( () => {

    if(body) {
      
      ;(async() => {
        setLoading(true)
        
        try { 
          
          const response = await fetch(serviseURL + path, {
            method: 'POST',
            headers: {
              'Content-Type': "application/json",
            },
            body: JSON.stringify(body)
          })

          if(response.status >= 200 && response.status <= 299) {

						setLoading(false)
            setData(await response.json())
            setBody(null)
          } else {

						setError(response.statusText || response.status);
            throw new Error(response.statusText || response.status)
          }
  
        } catch(e) {
          setLoading(false)
          setError(e.message)
        }
  
      })()
    }


  }, [body, path])

    return {
      loading,
      error,
      data,
      post: setBody
    }
}

export default usePost


