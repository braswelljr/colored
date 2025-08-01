'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { Spinner } from '~/components/ui/spinner';
import { cn } from '~/utils/cn';

type SearchBarProps = {
  className?: string;
  handler?: () => void;
  defaultQuery?: string;
  query?: string;
  onChangeQuery?: (query: string) => void;
  placeholder?: string;
};

/**
 * SearchBar - for sorting and searching list
 * @typedef {SearchBarProps}
 * @property {string} className - cn
 * @property {Function} Handler - performing functions on search
 * @property {string} searchQuery - search | query string
 * @property {Function} setSearchQuery - function to update Search query
 * @property {string} placeholder - Search placeholder
 */
export function Search({
  className,
  handler = () => {},
  defaultQuery = '',
  query: q,
  onChangeQuery: setQueryProp,
  placeholder = 'Search'
}: SearchBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [_query, _setQuery] = useState(defaultQuery);
  const query = q ?? _query;
  const setSearchQuery = useCallback(
    (value: string | ((value: string) => string)) => {
      const openState = typeof value === 'function' ? value(query) : value;
      if (setQueryProp) {
        setQueryProp(openState);
      } else {
        _setQuery(openState);
      }
    },
    [setQueryProp, query]
  );

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
        return;
      }
      e.preventDefault();
      searchInputRef.current?.focus();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // Search Handler
  useEffect(() => {
    const h = window.setTimeout(() => {
      handler?.();
    }, 100);
    return () => {
      window.clearTimeout(h);
    };
  }, [handler, query]);

  // set loading with debounce
  useEffect(() => {
    const loader = window.setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => {
      window.clearTimeout(loader);
    };
  }, [isLoading]);

  return (
    <form
      className={cn('group space-y-2', className)}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={cn('mx-auto flex px-2')}>
        <label
          htmlFor="search-input"
          className="flex flex-none items-center pr-3"
        >
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
          value={query}
          onChange={(e) => {
            setSearchQuery?.(e.target.value);
            setIsLoading(true);
          }}
          placeholder={`${placeholder && placeholder} (Press “/” to focus)`}
          className={cn(
            'flex-auto border-0 bg-inherit py-2 text-zinc-900 placeholder-zinc-500 focus:placeholder-zinc-400 focus:ring-0 focus:outline-none dark:text-zinc-200'
          )}
        />
      </div>
    </form>
  );
}
