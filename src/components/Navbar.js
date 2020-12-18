import React from "react";
import router from "../router";
import { Link } from "react-router-dom";

const Navbar = ({ appname }) => {
  return (
    <div className="sticky top-0 z-10 w-full px-3 py-3 text-white bg-green-700 md:px-12 xl:px-28 lg:px-20 md:flex md:items-center md:justify-between">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center justify-center space-x-2 text-lg font-normal md:text-3xl">
          <svg
            className="w-auto h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
          <div className="font-monoton">{appname}</div>
        </div>
        <button type="button" className="block focus:outline-none md:hidden">
          <svg
            className="w-auto h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        </button>
      </div>
      <div className="w-full md:flex md:items-center md:w-auto md:space-x-5">
        {router.map((route, index) => (
          <Link to={route.path} key={index}>
            <div className="">{route.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
