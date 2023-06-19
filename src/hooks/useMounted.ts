import { useEffect, useState } from 'react'

/**
 * useMounted - React hook that returns a boolean indicating if the component is mounted.
 * @returns {boolean} - Boolean indicating if the component is mounted.
 */
export default function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Set mounted to true after useEffect is called
    setMounted(true)

    // cleanup
    return () => setMounted(false)
  }, [])

  return mounted
}
