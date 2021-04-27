import { useState } from "react";
import { CodeIcon, XIcon } from "@heroicons/react/solid";
import { circuit } from "../backgrounds/background";
import useStore from "../store";

const Switch = () => {
  const [close, setClose] = useState("closed");
  const format = useStore(state => state.format);
  const switchHSL = useStore(state => state.setHSL);
  const switchRGB = useStore(state => state.setRGB);
  const switchHEX = useStore(state => state.setHEX);
  const theme = useStore(state => state.theme);

  return (
    <>
      <div
        className={`fixed z-[22] right-0 w-auto outline-none overflow-hidden space-x-0 top-[50vh] text-current transform transition-all ease-in duration-200 ${
          close === "closed" ? "translate-x-32" : "translate-x-0"
        } flex items-center justify-center`}
      >
        <button
          type="button"
          style={{
            backgroundImage: circuit,
            backgroundColor: theme.foreground,
            color: theme.honey
          }}
          className={`text-current outline-none focus:outline-none py-2 px-5 rounded-l-full`}
          onClick={event => {
            event.preventDefault();
            close === "closed" ? setClose("opened") : setClose("closed");
          }}
          tabIndex={-1}
        >
          {close === "closed" ? <CodeIcon className="w-5 h-5" /> : <XIcon className="w-5 h-5" />}
        </button>
        <div
          style={{
            backgroundImage: circuit,
            backgroundColor: theme.foreground,
            color: theme.honey
          }}
          className="w-auto p-0 rounded-l-xl"
        >
          <button
            style={{
              backgroundImage: circuit,
              backgroundColor: `${format === `hsl` ? theme.honey : theme.foreground}`,
              color: `${format === `hsl` ? theme.foreground : theme.honey}`
            }}
            className="block px-12 py-2 font-medium leading-relaxed rounded-l-xl focus:outline-none"
            onClick={switchHSL}
          >
            HSL
          </button>
          <button
            style={{
              backgroundImage: circuit,
              backgroundColor: `${format === `rgb` ? theme.honey : theme.foreground}`,
              color: `${format === `rgb` ? theme.foreground : theme.honey}`
            }}
            className="block px-[2.925rem] py-2 font-medium leading-relaxed rounded-l-xl focus:outline-none"
            onClick={switchRGB}
          >
            RGB
          </button>
          <button
            style={{
              backgroundImage: circuit,
              backgroundColor: `${format === `hex` ? theme.honey : theme.foreground}`,
              color: `${format === `hex` ? theme.foreground : theme.honey}`
            }}
            className="block px-12 py-2 font-medium leading-relaxed rounded-l-xl focus:outline-none"
            onClick={switchHEX}
          >
            HEX
          </button>
        </div>
      </div>
      <button
        className={`${
          close === "closed" ? `hidden` : `fixed`
        } z-[21] inset-0 w-full h-full bg-gray-800 bg-opacity-20`}
        tabIndex={-1}
        onClick={() => setClose("closed")}
      ></button>
    </>
  );
};

export default Switch;
