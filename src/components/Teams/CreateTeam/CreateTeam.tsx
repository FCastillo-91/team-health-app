import * as React from "react";
import { Button, Container, Header, Input } from "semantic-ui-react";
import { addTeam } from "../../../api/teams/addTeam.api";
import { useState } from "react";

export const CreateTeam = () => {
  const [teamNameInput, setTeamNameInput] = useState("");
  const [teamCodeInput, setTeamCodeInput] = useState("");

  const resetInputs = () => {
    setTeamNameInput("");
    setTeamCodeInput("");
  };
  const handleAddTeam = (name: any, code: any) => {
    addTeam(name, code);
    resetInputs();
  };

  return (
    <Container>
      <Header as="h2">New Team</Header>
      <Input
        icon="users"
        iconPosition="left"
        placeholder="Input team name..."
        value={teamNameInput}
        onChange={(e) => {
          setTeamNameInput(e.target.value);
        }}
      />
      <Input
        icon="add circle"
        iconPosition="left"
        placeholder="Input team code"
        value={teamCodeInput}
        onChange={(e) => {
          setTeamCodeInput(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          handleAddTeam(teamNameInput, teamCodeInput);
        }}
      >
        Create Team
      </Button>
    </Container>
  );
};
