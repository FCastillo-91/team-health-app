import * as React from "react";
import {Container, Form, Header, Icon, Table} from "semantic-ui-react";

export const MyTeamMembers = () => {
  return (
    <Container>
      <Header as="h1">
        <Icon name="user" />
        <Header.Content>Team Members</Header.Content>
      </Header>
      <Header as="h3">
        <Header.Content>Add Team Members</Header.Content>
      </Header>
      <Form>
        <Form.Input
          label="Email Address"
          action={{ icon: "add user" }}
          placeholder="Email address.."
        />
      </Form>
      <Header as="h3">Current Team Members</Header>
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
