import React, { useEffect, useState } from "react";
import { Button, Dropdown, Header } from "semantic-ui-react";
import { getAllTeams, Team } from "../../api/teams/readTeam.api";
import { useHistory } from "react-router-dom";

export const TakeTeamSurveyHomePage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const teamNames = await getAllTeams();
      setTeams(teamNames);
    })();
    // eslint-disable-next-line
  }, [getAllTeams]);

  const handleSetTeam = (teamCode: string) => {
    setSelectedTeam(teamCode);
  };

  const handleSubmit = () => {
    if (!selectedTeam) {
      return;
    }
    history.push(`/admin/teams/${selectedTeam}/survey`);
  };

  return (
    <>
      <Header as="h1">Team Health</Header>
      <p style={{ marginBottom: "20px" }}>
        Welcome to Team Health, a space to anonymously submit your score on ways
        of working,
        <br />
        sense of achievement and track the happiness of your team.
      </p>
      <p>Please select your team and start your survey..</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <Dropdown
          placeholder="Select Team"
          search
          selection
          options={teams.map((team) => ({
            key: team.code,
            value: team.code,
            text: team.name,
          }))}
          onChange={(e, data) => handleSetTeam(data.value as string)}
          value={selectedTeam}
        />
        <Button
          color="blue"
          style={{ marginLeft: "5px" }}
          disabled={!selectedTeam}
        >
          Start Survey
        </Button>
      </form>
    </>
  );
};
