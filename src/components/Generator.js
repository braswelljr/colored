import { useState, useEffect } from "react";
import useStore from "../store";
import { Transition } from "@headlessui/react";
import { Alert } from "@reach/alert";
import GenPad from "./palette/GenPad";
import { HSLtoRGB, RGBtoHEX } from "../utils/converts";

const Generator = () => {
  const gen = useStore(state => state.gen);
  const closeGen = useStore(state => state.closeGen);
  const [copied, setCopied] = useState(undefined);
  const format = useStore(state => state.format);
  const [x, setX] = useState("sat");

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
    let lightness = [];
    for (let s = 0; s <= 100; s += 5) {
      saturation.push({ h: color.h, s: s, l: color.l });
    }
    for (let l = 0; l <= 100; l += 5) {
      lightness.push({ h: color.h, s: color.s, l: l });
    }
    gen.saturation = saturation;
    gen.lightness = lightness;
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
        className={`fixed z-30 inset-x-0 bottom-0 bg-white h-[80vh] rounded-t-3xl px-3 py-4 md:px-12 xl:px-24 lg:px-20`}
      >
        <div
          style={{ gridTemplateColumns: `minmax(0, 3fr) minmax(0, 2fr)` }}
          className="grid items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <button
              style={{ backgroundColor: gen.name }}
              className="relative block w-24 h-16 overflow-hidden cursor-pointer focus:outline-none rounded-xl"
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
                    className="absolute inset-0 flex items-center justify-center w-full h-full text-white bg-gray-800 rounded-md pointer-events-none bg-opacity-40"
                  >
                    Copied !
                  </Alert>
                )}
              </Transition>
            </button>
            <div style={{ color: `currentcolor` }} className="font-medium">
              {gen.state === "opened"
                ? gen.color.name.length <= 0
                  ? gen.name
                  : gen.color.name
                : gen.name}
            </div>
          </div>
          <div className="flex justify-end space-x-1 md:hidden">
            <button
              className={`block px-2 rounded-full ${
                x !== "sat" ? `bg-gray-100` : `bg-gray-500`
              }  focus:outline-none`}
              onClick={() => (x !== "sat" ? setX("sat") : setX("sat"))}
            >
              Saturation
            </button>
            <button
              className={`block px-2 rounded-full ${
                x === "sat" ? `bg-gray-100` : `bg-gray-500`
              } focus:outline-none`}
              onClick={() => (x === "sat" ? setX("lig") : setX("lig"))}
            >
              Lightness
            </button>
          </div>
        </div>
        {/* saturation and lightness */}
        <div className="relative grid items-start grid-cols-1 pt-8 pb-12 mx-auto md:grid-cols-2 gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-4 sm:gap-y-8 max-w-container sm:pt-4">
          {/* saturation */}
          <section className={`${x === "sat" ? `block` : `hidden`} md:block`}>
            <div className="font-semibold">Saturation</div>
            <div style={{ gridTemplateRows: `auto` }} className="grid grid-cols-2 gap-0">
              {gen.state === "opened"
                ? gen.saturation.map((color, i) => {
                  if (format === "hsl") {
                    return <GenPad key={i} color={`hsl(${color.h}, ${color.s}%, ${color.l}%)`} />;
                  } else if (format === "rgb") {
                    color = HSLtoRGB(color);
                    return <GenPad key={i} color={`rgb(${color.r}, ${color.g}, ${color.b})`} />;
                  } else if (format === "hex") {
                    color = RGBtoHEX(HSLtoRGB(color));
                    return <GenPad key={i} color={`${color}`} />;
                  }
                })
                : undefined}
            </div>
          </section>
          {/* lightness */}
          <section className={`${x !== "sat" ? `block` : `hidden`} md:block`}>
            <div className="font-semibold">Lightness</div>
            <div style={{ gridTemplateRows: `auto` }} className="grid grid-cols-2 gap-0">
              {gen.state === "opened"
                ? gen.lightness.map((color, i) => {
                  if (format === "hsl") {
                    return <GenPad key={i} color={`hsl(${color.h}, ${color.s}%, ${color.l}%)`} />;
                  } else if (format === "rgb") {
                    color = HSLtoRGB(color);
                    return <GenPad key={i} color={`rgb(${color.r}, ${color.g}, ${color.b})`} />;
                  } else if (format === "hex") {
                    color = RGBtoHEX(HSLtoRGB(color));
                    return <GenPad key={i} color={`${color}`} />;
                  }
                })
                : undefined}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Generator;
