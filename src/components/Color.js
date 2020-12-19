const Color = ({ color }) => {
  return (
    <div className="relative h-24">
      <button
        type="button"
        id={color}
        className="absolute inset-0 flex items-center justify-center w-full border border-gray-200 rounded-lg cursor-auto"
        style={{ backgroundColor: color }}
      >
        {color}
      </button>
    </div>
  );
};

export default Color;
