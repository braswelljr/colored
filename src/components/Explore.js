import React from "react";
import useStore from "../store";
import ColorPad from "./palette/ColorPad";

// Alt + 127752 /-> rainbow
const Explore = () => {
  const HSL = useStore(state => state.hsl);
  const RGB = useStore(state => state.rgb);
  const HEX = useStore(state => state.hex);
  const format = useStore(state => state.format);

  return (
    <>
      <div
        style={{
          scrollBehavior: `smooth`,
          gridTemplateColumns: "repeat(auto-fill, minmax(132px, 1fr))"
        }}
        className={`grid gap-8 text-center text-xs leading-4`}
      >
        {format === "hsl" &&
          HSL.map((hsl, i) => (
            <ColorPad key={i} color={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
          ))}

        {format === "rgb" &&
          RGB.map((rgb, i) => (
            <ColorPad key={i} color={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
          ))}

        {format === "hex" &&
          HEX.map((hex, i) => <ColorPad key={i} color={`${hex}`} />)}
      </div>
    </>
  );
};

export default Explore;
