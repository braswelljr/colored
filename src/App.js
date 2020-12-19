import router from "./router/index";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Topper from "./components/Topper";
import ToTopButton from "./components/ToTopButton";

const App = () => {
  const appname = `colored`;
  const topperText = `Lorem ipsum dolor sit amet consectetur.`;

  return (
    <div className="w-full min-h-screen font-mulish">
      <Topper topperText={topperText} />
      <Navbar appname={appname} />
      <Switch>
        {router.map((route, index) => (
          <Route
            path={route.path}
            exact
            render={() => <route.component appname={appname} />}
            key={index}
          />
        ))}
      </Switch>
      <ToTopButton />
    </div>
  );
};

export default App;
