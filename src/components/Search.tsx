import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import Spinner from '~/components/Spinner'
import { classNames } from '~/utils/className'

/**
 * SearchBar - for sorting and searching list
 * @typedef {Object} SearchBarProps
 * @property {string} className - classNames
 * @property {Function} Handler - performing functions on search
 * @property {string} searchQuery - search | query string
 * @property {Function} setSearchQuery - function to update Search query
 * @property {string} placeholder - Search placeholder
 * @returns {JSX.Element} Search Componet
 */
export default function Search({
  className,
  handler = () => {},
  searchQuery,
  setSearchQuery,
  placeholder = 'Search'
}: {
  className?: string
  handler?: () => void
  searchQuery?: string
  setSearchQuery: Dispatch<SetStateAction<string | undefined>>
  placeholder?: string
}): JSX.Element {
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  // focus search input
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        e.key !== '/' ||
        (e.target as HTMLElement).tagName === 'INPUT' ||
        (e.target as HTMLElement).tagName === 'SELECT' ||
        (e.target as HTMLElement).tagName === 'TEXTAREA' ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return
      }
      e.preventDefault()
      searchInputRef.current?.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  // Search Handler
  useEffect(() => {
    const h = window.setTimeout(() => {
      handler()
    }, 100)
    return () => {
      window.clearTimeout(h)
    }
  }, [handler, searchQuery])

  // set loading with debounce
  useEffect(() => {
    const loader = window.setTimeout(() => {
      setIsLoading(false)
    }, 500)
    return () => {
      window.clearTimeout(loader)
    }
  }, [isLoading])

  return (
    <form className={classNames('group space-y-2', className)} onSubmit={e => e.preventDefault()}>
      <div className={classNames('max-w-container mx-auto flex px-2')}>
        <label htmlFor="search-input" className="flex flex-none items-center pr-3">
          <span className="sr-only">Search </span>
          {isLoading ? (
            <Spinner className="h-5 w-auto dark:text-yellow-500" />
          ) : (
            <HiSearch className="h-5 w-auto text-zinc-400 transition-colors duration-150 group-focus-within:text-zinc-500 dark:text-yellow-500 dark:group-focus-within:text-yellow-400" />
          )}
        </label>
        <input
          type="text"
          id="search-input"
          autoComplete="off"
          ref={searchInputRef}
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value)
            setIsLoading(true)
          }}
          placeholder={`${placeholder && placeholder} (Press “/” to focus)`}
          className={classNames(
            'flex-auto border-0 bg-inherit py-2 text-zinc-900 placeholder-zinc-500 focus:placeholder-zinc-400 focus:outline-none focus:ring-0 dark:text-zinc-200'
          )}
        />
      </div>
    </form>
  )
}
