import { useEffect } from "react";

const Search = () => {
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
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keyup", (key) => {
      if (key.key === "/") {
        document.querySelector("#search-input").focus();
      }
    });
  }, []);
  return (
    <div
      id="search"
      className={`sticky z-40 px-4 bg-white shadow md:px-12 lg:px-20 top-14`}
    >
      <form className="md:px-6" onSubmit={(event) => event.preventDefault()}>
        <div className="flex mx-auto max-w-container">
          <label
            htmlFor="search-input"
            className="flex items-center flex-none pr-3"
          >
            <span className="sr-only">Search all colors</span>
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-gray-400 transition-colors duration-150 group-focus-within:text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </label>
          <input
            type="text"
            id="search-input"
            placeholder="Search all colors (Press “/” to focus)"
            className="flex-auto py-6 text-base leading-6 text-gray-500 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400"
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
