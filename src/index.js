import React from "react";
import ReactDOM from "react-dom";
import { ListItems } from "./ListItems";

const App = () => {
  return (
        <div>
          <ListItems />
        </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
