/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'

export default function useFetchRequest(cb, args = []) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    setIsLoading(true)
    cb(...args)
      .then((fetchedData) => {
        setData(fetchedData)
      })
      .catch((e) => {
        console.log(e);
        setError(e)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])
  return { data, isLoading, error }
}
