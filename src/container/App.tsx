import React from "react";
import "./App.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import { TakeTeamSurveyHomePage } from "../components/TakeTeamSurveyHomePage/TakeTeamSurveyHomePage";
import { Survey } from "../components/Survey/Survey";
import { SurveyThanks } from "../components/Survey/SurveyThanks/SurveyThanks";
import { PersonaliseSurvey } from "../components/PersonaliseSurvey/PersonaliseSurvey";
import { TeamAdmin } from "../components/TeamAdmin/TeamAdmin";
import { AllTeamsTable } from "../components/AllTeamsTable/AllTeamsTable";
import { CreateTeam } from "../components/CreateTeam/CreateTeam";
import { OriginalNavBar } from "../components/OriginalNavBar/OriginalNavBar";

function App() {
  return (
    <div className="App">
      <HashRouter basename={process.env.PUBLIC_URL}>
        <OriginalNavBar />
        <Switch>
          <Route exact path="/" component={TakeTeamSurveyHomePage} />
          <Route exact path="/admin/teams" component={AllTeamsTable} />
          <Route exact path="/admin/teams/create" component={CreateTeam} />
          <Route exact path="/admin/teams/:teamId" component={TeamAdmin} />
          <Route exact path="/admin/teams/:teamId/survey" component={Survey} />
          <Route
            exact
            path="/admin/teams/:teamId/create-survey"
            component={PersonaliseSurvey}
          />
          <Route exact path="/survey/thanks" component={SurveyThanks} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
