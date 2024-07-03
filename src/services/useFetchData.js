import { useState, useEffect } from 'react'

export default function useFetchData(fetchFunction, args) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const result = await fetchFunction(...args)
        setData(result)
        setError(null)
      } catch (err) {
        setError(err)
        console.log(err)
        setData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, args)
  return { data, isLoading, error }
}
