import { useState, useEffect, useRef } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import useStore from "../store";

const Search = () => {
  const searchInputRef = useRef();
  const colors = useStore(state => state.colors);
  const [searchQuery, setSearchQuery] = useState("");
  const search = useStore(state => state.search);

  useEffect(() => {
    function onKeyDown(e) {
      if (
        e.key !== "/" ||
        e.target.tagName === "INPUT" ||
        e.target.tagName === "SELECT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      searchInputRef.current.focus();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const handler = window.setTimeout(() => {
      search(colors, searchQuery);
    }, 100);
    return () => {
      window.clearTimeout(handler);
    };
  }, [colors, searchQuery]);

  return (
    <form
      className="sticky top-0 z-20 px-4 bg-white shadow group sm:px-6 lg:px-16"
      onSubmit={e => e.preventDefault()}
    >
      <div className="flex mx-auto max-w-container">
        <label
          htmlFor="search-input"
          className="flex items-center flex-none pr-3"
        >
          <span className="sr-only">Search all {colors.length} colors</span>
          <SearchIcon className="w-auto h-5 text-gray-400 transition-colors duration-150 group-focus-within:text-gray-500" />
        </label>
        <input
          type="text"
          id="search-input"
          autoComplete="off"
          ref={searchInputRef}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={`Search all ${colors.length} colors (Press “/” to focus)`}
          className="flex-auto py-6 text-base leading-6 text-gray-500 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400"
        />
      </div>
    </form>
  );
};

export default Search;
