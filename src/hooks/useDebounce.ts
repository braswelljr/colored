'use client'

import { useEffect, useState } from 'react'

/**
 * useDebounce - useDebounce hook is used to debounce a value
 *
 * @param {T} value - Value to be debounced
 * @param {number} delay - Delay in milliseconds
 * @returns {T} - Debounced value
 */
export default function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => setDebouncedValue(value), delay)

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => clearTimeout(handler)
  }, [value, delay])

  // Return debounced value
  return debouncedValue
}
