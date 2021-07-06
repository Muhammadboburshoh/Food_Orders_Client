import { useState, useEffect } from "react"

function useDelete (path) {

  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ data, setData ] = useState(null)

  useEffect(() => {

    ;(async () => {

      try {
        setLoading(false)

        const response = await fetch("http://localhost:3000" + path, {
          method: "DELETE",
          headers : {
            "Content-Type": "application/json"
          }
        })

        const json = await response.json()
        if(json) {
          setLoading(false)
          setData(json)
        }

      } catch(e) {
        setLoading(false)
        setError(e)
      }

    })()

  }, [path])


  return {
    data,
    loading,
    error
  }
}

export default useDelete