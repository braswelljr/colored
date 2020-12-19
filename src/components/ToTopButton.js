import { useEffect } from "react";

const ToTopButton = () => {
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        document.querySelector("#topscroll").style.display = `flex`;
      } else {
        document.querySelector("#topscroll").style.display = `none`;
      }
    });
  }, []);
  return (
    <button
      type="button"
      onClick={() =>
        (document.documentElement.scrollTop = 0) &&
        (document.body.scrollTop = 0)
      }
      id="topscroll"
      className={`fixed z-10 ${
        document.documentElement.scrollTop > 70 || document.body.scrollTop > 70
          ? `flex`
          : `hidden`
      } items-center justify-center p-2 text-white bg-green-900 bg-transparent-50 rounded-full transition-all duration-300 md:p-3 bottom-4 right-4 focus:outline-none`}
    >
      <svg
        className="w-auto h-6 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
};

export default ToTopButton;
