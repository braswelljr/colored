import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { Alert } from "@reach/alert";

const GenPad = ({ color }) => {
  const [copied, setCopied] = useState(undefined);

  function copyColor(color) {
    return navigator.clipboard.writeText(`${color}`);
  }

  useEffect(() => {
    window.setTimeout(() => setCopied(undefined), 1000);
  }, [copied]);

  return (
    <>
      <button
        style={{ backgroundColor: color }}
        className="relative block w-full h-10 overflow-hidden text-xs border rounded-md cursor-pointer focus:outline-none"
        onClick={event => {
          event.preventDefault();
          copied === undefined ? setCopied("copied") : setCopied(undefined);
          copyColor(color);
        }}
        tabIndex={-1}
      >
        {color}
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
              className="absolute inset-0 flex items-center justify-center w-full h-full text-white bg-gray-800 rounded-md pointer-events-none bg-opacity-70"
            >
              Copied!
            </Alert>
          )}
        </Transition>
      </button>
    </>
  );
};

export default GenPad;
