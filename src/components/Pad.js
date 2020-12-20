import React from "react";
import Colors from "./Colors";
import color from "../utils/color";
import { hexToRGB } from "../utils/covert";

const Pad = () => {
  const colors = color([], 2000);
  console.log(colors.length);
  return (
    <div
      className="relative grid items-start grid-cols-2 pt-6 pb-12 mx-auto md:px-12 xl:px-28 lg:px-20 gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-4 sm:gap-y-8 max-w-container sm:pt-8"
      style={{ gridTemplateRows: "auto auto" }}
    >
      <section className="contents">
        <header className="flex flex-wrap items-baseline col-start-1 row-start-1">
          <h2 className="flex-none mr-3 text-lg font-semibold leading-6 text-green-900">
            HEX
          </h2>
          <p className="flex-auto hidden text-sm font-medium leading-5 text-gray-400 sm:block">
            ie. #2e2e2e
          </p>
        </header>
        <Colors colors={colors} className="col-start-1 row-start-2" />
      </section>
      <section className="contents">
        <header className="flex flex-wrap items-baseline col-start-2 row-start-1">
          <h2 className="flex-none mr-3 text-lg font-semibold leading-6 text-green-900">
            RGB
          </h2>
          <p className="flex-auto hidden text-sm font-medium leading-5 text-gray-400 sm:block">
            ie. rgb(156, 163, 175)
          </p>
        </header>
        <Colors
          colors={[...colors.map((color) => hexToRGB(color))]}
          className="col-start-1 row-start-2"
        />
      </section>
      <div className="absolute top-0 bottom-0 w-px bg-gray-200 left-1/2" />
    </div>
  );
};

export default Pad;
