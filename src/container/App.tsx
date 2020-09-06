import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "../components/Home/Home";
import { Header } from "../components/Header/Header";
import { Survey } from "../components/Survey/Survey";
import { SurveyThanks } from "../components/Survey/SurveyThanks/SurveyThanks";
import { CreateSurvey } from "../components/Survey/CreateSurvey/CreateSurvey";
import { Teams } from "../components/Teams/Teams";
import { TeamPage } from "../components/TeamPage/TeamPage";
import { CreateTeam } from "../components/Teams/CreateTeam/CreateTeam";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/teams" component={Teams} />
          <Route exact path="/teams/create" component={CreateTeam} />
          <Route exact path="/teams/:teamId" component={TeamPage} />
          <Route
            exact
            path="/teams/:teamId/create-survey"
            component={CreateSurvey}
          />
          <Route exact path="/survey" component={Survey} />
          <Route exact path="/survey/thanks" component={SurveyThanks} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
