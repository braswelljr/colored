import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Switch from "../components/Switch";
import Generator from "../components/Generator";
import Explore from "../components/Explore";
import Topper from "../components/Topper";
import Search from "../components/Search";
import useStore from "../store";

const Index = () => {
  const appName = `colored`;
  const [themeSwitch, setThemeSwitch] = useState("light");
  const theme = useStore(state => state.theme);

  /**
   * Save theme for localStorage
   */
  useEffect(() => {
    window.addEventListener("load", () => {
      if (typeof Storage !== "undefined") {
        localStorage.getItem(appName) === null
          ? localStorage.setItem(appName, theme.state)
          : setThemeSwitch(localStorage.getItem(appName));
      }
    });
  }, [appName]);

  return (
    <main style={{ scrollBehavior: `smooth` }} className={``}>
      {/* fixed inset-x-0 top-0 */}
      <Navbar appName={appName} />
      <Search />
      <Switch />
      <section
        style={{ scrollBehavior: `smooth` }}
        className={`w-full px-3 py-4 md:px-12 xl:px-24 lg:px-20`}
        // pt-[17.5rem]
      >
        <Explore themeSwitch={themeSwitch} />
      </section>
      <Topper themeSwitch={themeSwitch} />
      <Generator />
    </main>
  );
};

export default Index;
