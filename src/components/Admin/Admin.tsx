import * as React from "react";
import { CreateButton } from "./CreateButton/CreateButton";
import { Grid, Container } from "semantic-ui-react";

export const Admin = () => {
  return (
    <Container text>
      <h1> Admin Dashboard</h1>

      <Grid columns={2} stackable textAlign="center">
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <CreateButton
              buttonLabel="Create Team"
              title="Create a Team"
              text="Input all the team members who are part of the team and need to submit a monthly score."
              iconName="users"
              routeLink="/admin/team-members"
            />
          </Grid.Column>

          <Grid.Column>
            <CreateButton
              buttonLabel="Create Survey"
              title="Create a Survey"
              text="Personalise your questions to understand the health or your team."
              iconName="file alternate outline"
              routeLink="/admin/create-survey"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};
