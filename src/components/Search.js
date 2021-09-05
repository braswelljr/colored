import { useState, useEffect, useRef } from 'react'
import { HiSearch } from 'react-icons/hi'
import clsx from 'clsx'
import useStore from '@/store/index'
import Switch from '@/components/Switch'

const Search = () => {
  const searchInputRef = useRef()
  const colors = useStore(state => state.colors)
  const [searchQuery, setSearchQuery] = useState('')
  const search = useStore(state => state.search)
  const theme = useStore(state => state.theme)

  useEffect(() => {
    function onKeyDown(e) {
      if (
        e.key !== '/' ||
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'SELECT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return
      }
      e.preventDefault()
      searchInputRef.current.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    const handler = window.setTimeout(() => {
      search(colors, searchQuery)
    }, 100)
    return () => {
      window.clearTimeout(handler)
    }
  }, [colors, searchQuery])

  return (
    <form
      className={clsx('sticky top-0 inset-x-0 z-10 space-y-2 shadow group', {
        'bg-gray-900 text-yellow-300': theme !== 'light',
        'bg-white': theme === 'light'
      })}
      onSubmit={e => e.preventDefault()}
    >
      <div
        className={clsx(
          'flex mx-auto max-w-container shadow-sm sm:px-6 lg:px-16 px-4',
          {
            'bg-gray-800': theme !== 'light',
            'bg-white': theme === 'light'
          }
        )}
      >
        <label
          htmlFor="search-input"
          className="flex items-center flex-none pr-3"
        >
          <span className="sr-only">Search all {colors.length} colors</span>
          <HiSearch className="w-auto h-5 text-gray-400 transition-colors duration-150 group-focus-within:text-gray-500" />
        </label>
        <input
          type="text"
          id="search-input"
          autoComplete="off"
          ref={searchInputRef}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={`Search all ${colors.length} colors (Press “/” to focus)`}
          className={clsx(
            'flex-auto py-6 text-base leading-6 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400',
            {
              'bg-gray-800 text-gray-200': theme !== 'light',
              'bg-white text-gray-700': theme === 'light'
            }
          )}
        />
      </div>
      <Switch />
    </form>
  )
}

export default Search
