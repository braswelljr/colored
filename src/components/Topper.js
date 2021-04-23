import { useEffect } from "react";
import useStore from "../store";
import { circuit } from "../backgrounds/background";

const Topper = () => {
  const theme = useStore(state => state.theme);

  useEffect(() => {
    const topper = document.querySelector(`#topper`);
    window.addEventListener("scroll", () => {
      document.documentElement.scrollTop > 250 || document.body.scrollTop > 250
        ? (topper.style.transform = `translateY(0)`)
        : (document.querySelector(
          `#topper`
        ).style.transform = `translateY(80px)`);
    });
  }, []);

  return (
    <button
      type="button"
      id={`topper`}
      style={{
        backgroundColor: theme.foreground,
        backgroundImage: circuit,
        color: theme.honey,
        position: `fixed`,
        bottom: `1rem`,
        right: `1rem`,
        height: `auto`,
        width: `auto`,
        padding: `.5rem`,
        transition: `all 0.25s ease-in`
      }}
      className={`rounded-full focus:outline-none`}
      onClick={() =>
        (document.documentElement.scrollTop = 0) &&
        (document.body.scrollTop = 0)
      }
      tabIndex={-1}
    >
      <svg
        className={`h-10 w-10`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default Topper;
