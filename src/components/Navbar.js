import React, { useState } from "react";
import router from "../router";
import { Link } from "react-router-dom";

const Navbar = ({ appname }) => {
  const [menubutton] = useState(true);

  return (
    <div className="sticky top-0 z-50 w-full px-3 py-3 text-white bg-green-900 shadow-lg md:px-12 xl:px-28 lg:px-20 md:flex md:items-center md:justify-between">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center justify-center space-x-2 text-lg font-normal md:text-3xl">
          <svg
            className="block w-auto h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
              clipRule="evenodd"
            />
          </svg>
          <div className="font-monoton">{appname}</div>
        </div>
        <button
          type="button"
          className="block focus:outline-none md:hidden"
          onClick={
            (e) => e.preventDefault()
            // menubutton === true ? menubuttonstate(false) : menubuttonstate(true)
          }
        >
          <svg
            className={`w-auto h-6 ${
              menubutton === true ? `block` : `hidden`
            } `}
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
          <svg
            className={`w-auto h-6 ${
              menubutton === false ? `block` : `hidden`
            } `}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div
        className={`w-full ${
          menubutton === false ? `block` : `hidden`
        } md:flex md:items-center md:w-auto md:space-x-5 space-y-1 md:space-y-0`}
      >
        {router.map((route, index) => (
          <Link to={route.path} key={index}>
            <div className="py-2 pl-2 font-semibold uppercase rounded-sm hover:bg-green-700 md:px-4">
              {route.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
