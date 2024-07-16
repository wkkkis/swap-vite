import { useState, useEffect, useCallback } from 'react'

const useDebounce = (value: string, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  const onDebounceValueChange = useCallback(
    (val: string) => {
      setDebouncedValue(val)
    },
    [setDebouncedValue]
  )

  useEffect(() => {
    const handler = setTimeout(() => {
      onDebounceValueChange(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay, onDebounceValueChange])

  return debouncedValue
}

export { useDebounce }
