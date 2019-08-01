import React from "react";
import ReactDOM from "react-dom";
import { ListItems } from "./listItems";

const App = () => {
  return <ListItems />;
};

ReactDOM.render(<App />, document.querySelector("#root"));
