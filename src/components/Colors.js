import { useState, useEffect } from "react";
import Color from "./Color";

const Colors = ({ colors, filter }) => {
  const [renderAll, setRenderAll] = useState(false);

  useEffect(() => {
    setRenderAll(true);
  }, []);

  const filteredColor = filter
    ? colors
        // eslint-disable-next-line indent
        .filter((color) => filter.indexOf(color) !== -1)
        // eslint-disable-next-line indent
        .sort((a, b) => filter.indexOf(a) - filter.indexOf(b))
    : colors;

  return (
    <ul
      className={`grid gap-8 text-center text-xs leading-4`}
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(132px, 1fr))" }}
    >
      {filteredColor.slice(0, renderAll ? undefined : 38).map((color, i) => (
        <Color key={i} color={color} />
      ))}
    </ul>
  );
};

export default Colors;
