import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import App from "./src";

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.querySelector("#app"),
  );
};

render();

if (module.hot) {
  module.hot.accept("./src", render);
}
