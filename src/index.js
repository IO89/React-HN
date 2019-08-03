import React from "react";
import ReactDOM from "react-dom";
import { ListItems } from "./ListItems";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import {UserDetails} from "./UserDetails";
import {Header} from "./Header";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route exact path="/" component={ListItems} />
            <Route exact path="/users/:userId" component={UserDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
