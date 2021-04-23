import { useState, useEffect } from "react";
import { Transition } from "@tailwindui/react";
import { Alert } from "@reach/alert";
import useStore from "../../store";

const ColorPad = ({ color }) => {
  const [copied, setCopied] = useState(undefined);
  const openGen = useStore(state => state.openGen);

  function copyColor(color) {
    return navigator.clipboard.writeText(`${color}`);
  }

  useEffect(() => {
    window.setTimeout(() => setCopied(undefined), 500);
  }, [copied]);

  return (
    <>
      <div
        style={{ backgroundColor: `${color}` }}
        className={`h-24 relative flex items-center cursor-pointer font-semibold text-gray-800 rounded-lg justify-center`}
      >
        {color}
        <div className="absolute opacity-0 hover:opacity-100 grid inset-0 transition-all duration-200 ease-in h-full grid-flow-row grid-rows-2 gap-2 p-1.5">
          <button
            type="button"
            className={`flex items-center w-full justify-center font-bold rounded-t-lg bg-gray-900 text-white bg-opacity-30 focus:outline-none hover:bg-opacity-60`}
            onClick={event => {
              event.preventDefault();
              copied === undefined ? setCopied("copied") : setCopied(undefined);
              copyColor(color);
            }}
            tabIndex={-1}
          >
            Copy
          </button>
          <button
            type="button"
            className={`flex items-center w-full justify-center font-bold rounded-b-lg bg-gray-900 text-white bg-opacity-30 focus:outline-none hover:bg-opacity-60`}
            tabIndex={-1}
            onClick={() => openGen(color)}
          >
            Split
          </button>
        </div>
        <Transition
          show={copied === "copied"}
          enter="transition-opacity duration-300 ease-in"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300 ease-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {ref => (
            <Alert
              ref={ref}
              className="absolute inset-0 m-1.5 flex items-center justify-center bg-gray-800 bg-opacity-80 text-white rounded-lg pointer-events-none"
            >
              Copied!
            </Alert>
          )}
        </Transition>
      </div>
    </>
  );
};

export default ColorPad;
