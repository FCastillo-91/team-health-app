import * as React from "react";
import {
  Form,
  Container,
  Divider,
  Header,
  Icon,
  Button,
} from "semantic-ui-react";
import { MyTeamMembers } from "../MyTeamMembers/MyTeamMembers";
import { Link } from "react-router-dom";

export const CreateTeam = () => {
  return (
    <Container textAlign="left">
      <Header as="h1">
        <Icon name="users" />
        <Header.Content>My Team</Header.Content>
      </Header>
      <Header as="h3">
        <Header.Content>1. Create a Team</Header.Content>
      </Header>
      <Form>
        <Form.Input
          label="Team Name Input"
          action={{ icon: "add" }}
          placeholder="Type team name here.."
        />
      </Form>
      <Divider />
      <MyTeamMembers />
      <Button as={Link} to="/admin/thanks">
        Submit
      </Button>
    </Container>
  );
};
