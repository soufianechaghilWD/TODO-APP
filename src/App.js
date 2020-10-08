import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import In from "./components/In";
import Signin from "./components/Signin";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/in" component={In} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </Router>
  );
}

export default App;
