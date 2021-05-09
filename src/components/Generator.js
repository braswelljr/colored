import { useState, useEffect } from "react";
import useStore from "../store";
import { Transition } from "@headlessui/react";
import { Alert } from "@reach/alert";
import GenPad from "./palette/GenPad";
import { HSLtoRGB, RGBtoHEX } from "../utils/converts";
import { Switch } from "@headlessui/react";

const Generator = () => {
  const gen = useStore(state => state.gen);
  const closeGen = useStore(state => state.closeGen);
  const [copied, setCopied] = useState(undefined);
  const format = useStore(state => state.format);
  const [enabled, setEnabled] = useState(false);

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
    for (let s = 0; s <= 100; s++) {
      saturation.push({ h: color.h, s: s, l: color.l });
    }
    for (let l = 0; l <= 100; l++) {
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
        className={`fixed z-30 inset-x-0 bottom-0 overflow-y-auto bg-white h-[80vh] rounded-t-3xl px-3 py-2 md:px-12 xl:px-24 lg:px-20 scrollbars-hidden scrollbars-hidden-f`}
      >
        <div className="fixed inset-x-0 z-[1] -mt-2 flex items-center justify-between px-3 py-2 bg-white rounded-t-3xl md:px-12 xl:px-24 lg:px-20">
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
            <div style={{ color: `currentcolor` }} className="font-bold">
              {gen.state === "opened"
                ? gen.color.name.length <= 0
                  ? gen.name
                  : gen.color.name
                : gen.name}
            </div>
          </div>
          <div className="md:hidden">
            <Switch
              checked={enabled}
              onChange={setEnabled}
              style={{ backgroundColor: gen.name }}
              className={`relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                style={{ color: gen.name }}
                className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-flex font-semibold h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 items-center justify-center transition ease-in-out duration-200`}
              >
                {enabled ? `L` : `S`}
              </span>
            </Switch>
          </div>
        </div>

        {/* saturation and lightness */}
        <div className="relative grid items-start grid-cols-1 pt-20 pb-12 mx-auto md:grid-cols-2 gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-4 sm:gap-y-8 max-w-container">
          {/* saturation */}
          <section className={`${enabled === false ? `block` : `hidden`} md:block`}>
            <div className="font-semibold">Saturation</div>
            <div
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))" }}
              className="grid gap-2 pt-4 "
            >
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
          <section className={`${enabled !== false ? `block` : `hidden`} md:block`}>
            <div className="font-semibold">Lightness</div>
            <div
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))" }}
              className="grid gap-2 pt-4"
            >
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
