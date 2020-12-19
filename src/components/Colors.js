import Color from "./Color";

const Colors = ({ colors }) => {
  return (
    <ul
      className={`grid gap-8 text-center text-xs leading-4`}
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(132px, 1fr))" }}
    >
      {colors.map((color, i) => (
        <Color key={i} color={color} />
      ))}
    </ul>
  );
};

export default Colors;
