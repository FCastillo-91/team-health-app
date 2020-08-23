import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "../components/Home/Home";
import { Header } from "../components/Header/Header";
import { Features } from "../components/Features/Features";
import { Admin } from "../components/Admin/Admin";
import { Survey } from "../components/Survey/Survey";
import { SurveyThanks } from "../components/Survey/SurveyThanks/SurveyThanks";
import { CreateTeam } from "../components/Admin/CreateTeam/CreateTeam";
import { CreateSurvey } from "../components/Admin/CreateSurvey/CreateSurvey";
import { AdminThanks } from "../components/Admin/AdminThanks/AdminThanks";


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
          <Route exact path="/survey/thanks" component={SurveyThanks} />
          <Route exact path="/admin/team-members" component={CreateTeam} />
          <Route exact path="/admin/create-survey" component={CreateSurvey} />
          <Route exact path="/admin/thanks" component={AdminThanks} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;