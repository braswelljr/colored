import React from "react";
import { circuit } from "../backgrounds/background";
import useStore from "../store";

const Navbar = ({ appName }) => {
  const theme = useStore(state => state.theme);
  const themeLight = useStore(state => state.themeLight);
  const themeDark = useStore(state => state.themeDark);
  const colors = useStore(state => state.colors);

  return (
    <nav
      style={{
        backgroundImage: circuit,
        backgroundColor: `${theme.foreground}`,
        color: `${theme.honey}`
      }}
      className={`w-full px-3 py-4 text-white shadow-lg md:px-12 xl:px-28 lg:px-20 clip-head`}
    >
      <section
        style={{ backdropFilter: `` }}
        className={`flex items-center justify-between w-full`}
      >
        <div
          className={`flex items-center justify-center space-x-2 text-lg font-normal md:text-2xl`}
        >
          <svg
            className="block w-auto h-6"
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
          <div className={`uppercase font-semibold`}>{appName}</div>
        </div>
        <button
          type="button"
          className={`w-10 focus:outline-none h-3 transform translate-x-[-0.1rem] bg-yellow-200 rounded-lg relative shadow-inner`}
          onClick={event => {
            event.preventDefault();
            if (theme.state !== "light") {
              themeLight();
              localStorage.setItem(appName, "light");
            } else {
              themeDark();
              localStorage.setItem(appName, "dark");
            }
          }}
        >
          <div
            className={`absolute w-6 h-6 rounded-full shadow top-[-5.75px] transform transition-all duration-200 ${
              theme.state === "light" ? `translate-x-0` : `translate-x-4`
            }`}
            style={{
              backgroundColor: `${theme.honey}`
            }}
          ></div>
        </button>
      </section>
      <section
        className={`w-full px-6 py-5 space-y-5 md:py-8 lg:py-10 lg:flex-row xl:px-28 lg:px-20 lg:space-x-10`}
      >
        <div className="text-xl font-bold leading-9 tracking-wider text-center uppercase px-auto">
          <span className="text-gray-300">{appName}</span>, gets you to chose
          design with your handpicked colors.
        </div>
        <div className="flex items-center justify-between w-full text-xs font-semibold">
          <div className="flex items-center">
            <svg
              className="block w-auto h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
                clipRule="evenodd"
              />
            </svg>
            <div className="">{colors.length} Colors</div>
          </div>
          <div className="flex items-center">
            <svg
              className="block w-auto h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <div className="">3 Different format</div>
          </div>
          <div className="flex items-center">
            <svg
              className="block w-auto h-6"
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
            <div className="">Create a palette</div>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
