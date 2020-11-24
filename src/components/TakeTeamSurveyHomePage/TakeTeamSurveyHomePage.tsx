import React from "react";
import { useEffect, useState } from "react";
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
  }, [getAllTeams]);

  const handleSetTeam = (teamCode: string) => {
    setSelectedTeam(teamCode);
  };

  const handleSubmit = () => {
    if (!selectedTeam) {
      return;
    }
    history.push(`/teams/${selectedTeam}/survey`);
  };

  return (
    <>
      <Header as="h1">Welcome to Team Health</Header>
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
        <Button disabled={!selectedTeam}>Start Survey</Button>
      </form>
    </>
  );
};
