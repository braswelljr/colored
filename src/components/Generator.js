import { useEffect } from "react";
import useStore from "../store";

const Generator = () => {
  const gen = useStore(state => state.gen);
  const closeGen = useStore(state => state.closeGen);

  useEffect(() => {
    if (gen.state === "closed") {
      document.body.style.overflowY = "auto";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflowY = "hidden";
      document.body.style.height = "100vh";
    }
  }, [gen.state]);

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
        <div className="flex items-center space-x-2">
          <div
            style={{ backgroundColor: gen.name }}
            className="w-24 h-16 rounded-xl"
          ></div>
          <div className="font-semibold">
            {gen.state === "opened"
              ? gen.color.name.length <= 0
                ? gen.name
                : `${gen.color.name} / ${gen.name}`
              : gen.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
