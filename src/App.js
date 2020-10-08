import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import In from "./components/In";
import Signin from "./components/Signin";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/in" component={In} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </Router>
  );
}

export default App;
