import React, { useEffect } from "react";
import router from "./router/index";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Topper from "./components/Topper";
import ToTopButton from "./components/ToTopButton";

const App = () => {
  const appname = `colored`;
  const topperText = `Lorem ipsum dolor sit amet consectetur.`;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        document.querySelector("#topscroll").style.display = `flex`;
      } else {
        document.querySelector("#topscroll").style.display = `none`;
      }
    });
  });

  const palette = [];

  const arrayify = (array, length) => {
    for (let index = 0; index < length; index++) {
      var RandStr = Math.floor(Math.random() * 16777215).toString(16);
      array.push(`#${RandStr}`);
    }

    return [...new Set(array)];
  };

  arrayify(palette, 1);
  console.log(palette);

  return (
    <div className="w-full min-h-screen font-mulish">
      <Topper topperText={topperText} />
      <Navbar appname={appname} />
      <Switch>
        {router.map((route, index) => (
          <Route
            path={route.path}
            palette={palette}
            exact
            component={route.component}
            key={index}
          />
        ))}
      </Switch>
      <ToTopButton />
    </div>
  );
};

export default App;
