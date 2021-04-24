import { useState, useEffect } from "react";
import useStore from "../store";
import ColorPad from "./palette/ColorPad";

// Alt + 127752 /-> rainbow
const Explore = () => {
  const colors = useStore(state => state.colors);
  const format = useStore(state => state.format);
  const filterate = useStore(state => state.filter);
  const [renderAll, setRenderAll] = useState(false);

  useEffect(() => {
    setRenderAll(true);
  }, []);

  const filteredColors = filterate
    ? colors
        .filter(color => filterate.indexOf(color) !== -1)
        .sort((a, b) => filterate.indexOf(a) - filterate.indexOf(b))
    : colors;

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
          filteredColors
            .slice(0, renderAll ? undefined : colors.length)
            .map((color, i) => (
              <ColorPad key={i} color={`${color.string.hsl}`} />
            ))}

        {format === "rgb" &&
          filteredColors
            .slice(0, renderAll ? undefined : colors.length)
            .map((color, i) => (
              <ColorPad key={i} color={`${color.string.rgb}`} />
            ))}

        {format === "hex" &&
          filteredColors
            .slice(0, renderAll ? undefined : colors.length)
            .map((color, i) => (
              <ColorPad key={i} color={`${color.string.hex}`} />
            ))}
      </div>
    </>
  );
};

export default Explore;
