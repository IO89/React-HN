import React from "react";
import ReactDOM from "react-dom";
import { ListItems } from "./listItems";

const App = () => {
  return (
    <div className="ui container comments">
      <div className="comment">
        <a href="/" className="avatar">
          <img alt="avatar" />
        </a>
        <div className="content">
          <a href="/" className="author">
            Morris
          </a>
          <div className="metadata" />
          <span className="date">Some time</span>
        </div>
        <div className="text">Some text</div>
        <div>
          <ListItems />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
