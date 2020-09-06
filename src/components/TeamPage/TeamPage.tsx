import * as React from "react";
import { MyTeamMembers } from "../Teams/MyTeamMembers/MyTeamMembers";
import { useParams } from "react-router-dom";
import { CreateButton } from "../utils/CreateButton/CreateButton";
import { Container, Header, Icon, Table } from "semantic-ui-react";

export const TeamPage = () => {
  const { teamId } = useParams();
  return (
    <>
      <MyTeamMembers />
      <Container>
        <Header as="h1">
          <Icon name="user" />
          <Header.Content>Surveys</Header.Content>
        </Header>

        <Header as="h3">Survey Schedule</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Survey Month</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <a href="month">September 2020</a>
              </Table.Cell>
              <Table.Cell>
                <p>Complete</p>
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
      <CreateButton
        buttonLabel="Create Survey"
        title="Create a new survey"
        text="Personalise your questions to understand the health or your team."
        iconName="file alternate outline"
        routeLink={`/teams/${teamId}/create-survey`}
      />
    </>
  );
};
