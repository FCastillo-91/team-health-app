import * as React from "react";
import { TeamSelector } from "../MyTeamMembers/TeamSelector";
import { Container, Button } from "semantic-ui-react";

export const CreateSurvey = () => {
  return (
    <Container>
      <h1>Create Survey Page</h1>
      <TeamSelector />
      <Button>Add Question</Button>
    </Container>
  );
};
