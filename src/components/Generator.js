import { useState, useEffect } from "react";
import useStore from "../store";
import { Transition } from "@headlessui/react";
import { Alert } from "@reach/alert";
import { circuit } from "../backgrounds/background";
//import ProgressSlider from "./palette/ProgressSlider";

const Generator = () => {
  const gen = useStore(state => state.gen);
  const closeGen = useStore(state => state.closeGen);
  const theme = useStore(state => state.theme);
  const [copied, setCopied] = useState(undefined);
  const [slideValue, setSliderValue] = useState(50);

  function copyColor(color) {
    return navigator.clipboard.writeText(`${color}`);
  }

  useEffect(() => {
    window.setTimeout(() => setCopied(undefined), 500);
  }, [copied]);

  useEffect(() => {
    if (gen.state === "closed") {
      document.body.style.overflowY = "auto";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflowY = "hidden";
      document.body.style.height = "100vh";
    }
  }, [gen.state]);

  if (gen.state === "opened") {
    const color = gen.color.obj.hsl;
    let saturation = [];
    for (let s = 0; s < 100; s += 5) {
      saturation.push({ h: color.h, s: s, l: color.l });
    }
  }

  return (
    <div
      className={`inset-0 fixed z-30 transform transition-all ease-in duration-300  ${
        gen.state === "closed" ? `translate-y-full` : `translate-y-0`
      }`}
    >
      <button
        type="button"
        tabIndex={-1}
        className={`fixed inset-0 bg-gray-900 bg-opacity-20 z-30 h-full w-full focus:outline-none ${
          gen.state === "closed" ? `hidden` : `block`
        }`}
        onClick={closeGen}
      ></button>
      <div
        className={`fixed z-30 inset-x-0 bottom-0 bg-white h-4/5 rounded-t-3xl px-3 py-4 md:px-12 xl:px-24 lg:px-20`}
      >
        <div
          style={{ gridTemplateColumns: `minmax(0, 1fr) minmax(0, 2fr)` }}
          className="items-center justify-between md:grid"
        >
          <div className="flex items-center space-x-2">
            <button
              style={{ backgroundColor: gen.name }}
              className="block w-24 h-16 cursor-pointer focus:outline-none rounded-xl"
              onClick={event => {
                event.preventDefault();
                copied === undefined ? setCopied("copied") : setCopied(undefined);
                copyColor(gen.name);
              }}
              tabIndex={-1}
            >
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
                    style={{
                      backgroundImage: circuit,
                      backgroundColor: theme.foreground,
                      color: theme.honey
                    }}
                    className="absolute flex items-center justify-center py-2 rounded-md pointer-events-none inset-x-4 bottom-4"
                  >
                    {gen.name} Copied 📋!
                  </Alert>
                )}
              </Transition>
            </button>
            <div className="font-medium">
              {gen.state === "opened"
                ? gen.color.name.length <= 0
                  ? gen.name
                  : gen.color.name
                : gen.name}
            </div>
          </div>
          {/* <div className="mt-4 md:mt-0">
            <div className="flex items-center mt-2 space-x-2">
              <ProgressSlider
                color={{ foreground: gen.name, background: `rgb(212, 212, 212)` }}
                slide={{ value: slideValue, func: setSliderValue }}
              />
              <div
                style={{ backdropFilter: `blur(5px)` }}
                className="inline-flex items-center px-2 text-xs bg-gray-400 rounded-md bg-opacity-30"
              >
                {slideValue}%
              </div>
            </div>
          </div> */}
        </div>
        {/* saturation and lightness */}
        <div className="relative grid items-start grid-cols-2 pt-6 pb-12 mx-auto gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-4 sm:gap-y-8 max-w-container sm:pt-8">
          <section className="">
            <div className="font-semibold">Saturation</div>
            <div style={{ gridTemplateRows: `auto` }} className="grid grid-cols-1 gap-0"></div>
          </section>
          <section className="">
            <div className="font-semibold">Lightness</div>
            <div style={{ gridTemplateRows: `auto` }} className="grid grid-cols-1 gap-0"></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Generator;
