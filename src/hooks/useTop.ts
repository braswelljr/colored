'use client'

import { useEffect, useState } from 'react'

/**
 * useTop - A hook to get the top of the page
 * @returns {number} - The top of the page
 * @example
 * const top = useTop()
 * console.log(top)
 * // 0
 */
export default function useTop(): number {
  const [top, setTop] = useState(0)

  useEffect(() => {
    function handleScroll() {
      setTop(window.scrollY) // Set the top of the page
    }

    // Add event listener
    window.addEventListener('scroll', handleScroll)

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return top
}
