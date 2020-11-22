import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TakeTeamSurveyHomePage } from "../components/TakeTeamSurveyHomePage/TakeTeamSurveyHomePage";
import { NavBar } from "../components/NavBar/NavBar";
import { Survey } from "../components/Survey/Survey";
import { SurveyThanks } from "../components/Survey/SurveyThanks/SurveyThanks";
import { PersonaliseSurvey } from "../components/PersonaliseSurvey/PersonaliseSurvey";
import { TeamAdmin } from "../components/TeamAdmin/TeamAdmin";
import { AllTeamsTable } from "../components/AllTeamsTable/AllTeamsTable";
import { CreateTeam } from "../components/CreateTeam/CreateTeam";

function App() {
  return (
    <div className="App">
      <Router basename={"/team-health-app"}>
        <NavBar />
        <Switch>
          <Route exact path="/team-health-app" component={TakeTeamSurveyHomePage} />
          <Route exact path="/teams" component={AllTeamsTable} />
          <Route exact path="/teams/create" component={CreateTeam} />
          <Route exact path="/teams/:teamId" component={TeamAdmin} />
          <Route exact path="/teams/:teamId/survey" component={Survey} />

          <Route
            exact
            path="/teams/:teamId/create-survey"
            component={PersonaliseSurvey}
          />
          <Route exact path="/survey/thanks" component={SurveyThanks} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
