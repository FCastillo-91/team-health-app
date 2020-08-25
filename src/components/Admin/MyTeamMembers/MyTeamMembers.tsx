import * as React from "react";
import { TeamSelector } from "./TeamSelector";
import { Container, Form, Header, Icon, Table } from "semantic-ui-react";

export const MyTeamMembers = () => {
  const teamOptions = [
    { text: "View My Booking", value: "teamId_1" },
    { text: "Frictionless Merchandising", value: "teamId_2" },
  ];
  return (
    <Container>
      <Header as="h1">
        <Icon name="user" />
        <Header.Content>My Team Members</Header.Content>
      </Header>
      <TeamSelector />
      <Header as="h3">
        <Header.Content>
          3. Add Team Member to {teamOptions[0].text}
        </Header.Content>
      </Header>
      <Form>
        <Form.Input
          label="Email Address"
          action={{ icon: "add user" }}
          placeholder="Email address.."
        />
      </Form>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <p>fiona.castillo@booking.com</p>
            </Table.Cell>
            <Table.Cell>
              <Icon name="edit" />
            </Table.Cell>
            <Table.Cell>
              <Icon name="delete" />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};
