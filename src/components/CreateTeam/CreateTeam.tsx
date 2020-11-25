import React, { useState } from "react";
import { Button, Container, Form, Input } from "semantic-ui-react";
import { addTeam } from "../../api/teams/addTeam.api";
import { useHistory } from "react-router-dom";
import { PageHeader } from "../utils/PageHeader/PageHeader";
import { checkTeamCode } from "../../api/teams/readTeam.api";

export const CreateTeam = () => {
  const [teamNameInput, setTeamNameInput] = useState("");
  const [teamCodeInput, setTeamCodeInput] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    isError: false,
    message: "",
  });
  const [disableButton, setDisableButton] = useState(false);
  const history = useHistory();

  const resetInputs = () => {
    setTeamNameInput("");
    setTeamCodeInput("");
  };

  const handleTeamCode = (teamCode: string) => {
    const parsedTeamCode = teamCode.trim().toUpperCase().replace(/\s/g, "");

    setTeamCodeInput(parsedTeamCode);
  };
  const existTeamCode = async (teamCode: string) => {
    return await checkTeamCode(teamCode);
  };

  const handleAddValidTeam = async (
    name: string,
    code: string,
    survey: string
  ) => {
    await addTeam(name, code, survey);
    resetInputs();
    goToTeamPage();
  };

  const handleAddTeam = async (name: string, code: string, survey: string) => {
    if (await existTeamCode(code)) {
      setErrorMessage({
        isError: true,
        message: "Team code already exists, please choose another one",
      });
      setDisableButton(true);
    } else {
      await handleAddValidTeam(name, code, survey);
    }
  };

  const goToTeamPage = () => {
    if (!teamNameInput && !teamCodeInput) {
      return;
    }
    history.push(`/admin/teams/${teamCodeInput}`);
  };

  return (
    <Container>
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
          error={errorMessage.isError}
          onChange={(e) => {
            handleTeamCode(e.target.value);
            setErrorMessage({ isError: false, message: "" });
            setDisableButton(false);
          }}
        />
        {errorMessage.isError && <p>{errorMessage.message}</p>}
        <p>You will be assigned a default survey when you create your team.</p>
        <Button
          color="blue"
          disabled={!teamCodeInput || !teamNameInput || disableButton}
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
