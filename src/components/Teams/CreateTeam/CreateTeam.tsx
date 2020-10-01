import * as React from "react";
import {
  Button,
  Container,
  Form,
  Header,
  Input,
  Segment,
} from "semantic-ui-react";
import { addTeam } from "../../../api/teams/addTeam.api";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { PageHeader } from "../../utils/PageHeader/PageHeader";

export const CreateTeam = () => {
  const [teamNameInput, setTeamNameInput] = useState("");
  const [teamCodeInput, setTeamCodeInput] = useState("");
  const history = useHistory();

  const resetInputs = () => {
    setTeamNameInput("");
    setTeamCodeInput("");
  };
  const handleAddTeam = (name: any, code: any, survey: any) => {
    addTeam(name, code, survey);
    resetInputs();
    goToTeamPage();
  };

  const goToTeamPage = () => {
    if (!teamNameInput && !teamCodeInput) {
      return;
    }
    history.push(`/teams/${teamCodeInput}`);
  };

  return (
    <Container >
      <PageHeader iconLabel="user plus" content="Create Your Team" />
      <Form style={{ justifyItems: "left" }}>
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
          placeholder="Input team code.."
          value={teamCodeInput}
          onChange={(e) => {
            setTeamCodeInput(e.target.value);
          }}
        />

        <p>You will be assigned a default survey when you create your team.</p>
        <Button
          disabled={!teamCodeInput || !teamNameInput}
          onClick={() => {
            handleAddTeam(teamNameInput, teamCodeInput, "default_survey");
          }}
        >
          Create Team
        </Button>
      </Form>
    </Container>
  );
};
