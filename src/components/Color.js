import { useEffect, useState } from "react";
import { alphaToHex } from "../utils/covert";

const Color = ({ color }) => {
  const [state, setState] = useState("iddle");
  const types = ["plane", "alpha"];
  var percentage = 50;

  function copyColor(color, type) {
    if (type === "alpha") {
      if (/(?:#|0x)(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(color)) {
        return navigator.clipboard.writeText(
          `${color}${alphaToHex(percentage)}`
        );
      }
      return navigator.clipboard.writeText(
        color.replace(`)`, `, ${percentage}% )`)
      );
    }
    return navigator.clipboard.writeText(color);
  }

  function copy(type) {
    if (state === "iddle") {
      copyColor(color, type).then(() => setState("copied"));
    }
  }
  useEffect(() => {
    window.setTimeout(() => setState("iddle"), 500);
  }, [state]);

  return (
    <div
      id="color"
      className="relative h-24 overflow-hidden font-medium cursor-pointer"
    >
      <button
        type="button"
        id={color}
        className="absolute inset-0 flex items-center justify-center w-full border border-gray-200 rounded-lg"
        style={{ backgroundColor: color }}
      >
        {color}
      </button>
      <div
        id="board"
        className={`absolute inset-0 grid-cols-1 grid-rows-2 gap-2 p-1 transition-opacity duration-200 opacity-0 hover:opacity-100 ${
          state === `iddle` ? `grid` : `hidden`
        }`}
      >
        {types.map((type, i) => (
          <button
            key={i}
            className="w-full h-full font-semibold text-white capitalize transition-all duration-200 ease-in bg-gray-800 border-gray-700 rounded-lg focus:outline-none group-hover:opacity-100 opacity-30 hover:opacity-80"
            onClick={() => copy(type)}
            tabIndex={-1}
          >
            Copy {type}
          </button>
        ))}
      </div>
      <div
        className={`absolute inset-0 font-semibold text-white p-1 rounded-md capitalize transition-all duration-200 ease-in bg-transparent items-center justify-center ${
          state === `iddle` ? `hidden` : `flex`
        }`}
      >
        <span className="flex items-center justify-center w-full h-full transition-all duration-200 ease-in bg-gray-800 rounded-lg opacity-90">
          Copied
        </span>
      </div>
    </div>
  );
};

export default Color;
