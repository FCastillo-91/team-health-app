import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { CreateButton } from "../utils/CreateButton/CreateButton";
import { Container, Divider, Header, Segment, Table } from "semantic-ui-react";
import { PageHeader } from "../utils/PageHeader/PageHeader";

export const TeamPage = () => {
  const { teamId } = useParams();

  return (
    <>
      <Container>
        <PageHeader iconLabel="user" content={`${teamId} Team Page`} />
        <Segment textAlign="left">
          <p>Great news! Your team has an active survey</p>
          <Link to={`/teams/${teamId}/survey`}>{`Team ${teamId} Survey`}</Link>
        </Segment>

        <Divider />
        <Header as="h3" textAlign="left">
          Survey Scores
        </Header>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Survey Month</Table.HeaderCell>
              <Table.HeaderCell>Avg Score</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <a href="month">September 2020</a>
              </Table.Cell>
              <Table.Cell>
                <p>3.56</p>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <CreateButton
          buttonLabel="Create Survey"
          title="Create a new survey"
          text="Personalise your questions to understand the health or your team."
          iconName="file alternate outline"
          routeLink={`/teams/${teamId}/create-survey`}
        />
      </Container>
    </>
  );
};
