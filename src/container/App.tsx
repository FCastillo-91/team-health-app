import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "../components/Home/Home";
import { Header } from "../components/Header/Header";
import { Features } from "../components/Features/Features";
import { Admin } from "../components/Admin/Admin";
import { Survey } from "../components/Survey/Survey";
import {Thanks} from "../components/Survey/Thanks/Thanks";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/features" component={Features} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/survey" component={Survey} />
          <Route exact path="/thanks" component={Thanks} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
