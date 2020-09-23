import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CreateButton } from "../utils/CreateButton/CreateButton";
import { Container, Divider, Header, Segment, Table } from "semantic-ui-react";
import { PageHeader } from "../utils/PageHeader/PageHeader";
import { getAllResultsDataPerTeam } from "../../api/surveyResults/readSurveyResult";
import { TableHeaders } from "../utils/CreateTable/DataTable";

export const TeamPage = () => {
  const { teamId } = useParams();
  const [surveyResults, setSurveyResults] = useState();

  useEffect(() => {
    getAllResultsDataPerTeam(teamId).then((results) => {
      setSurveyResults(results);
    });
  }, []);

  // 1. Add a table showing Surveys section only show last 3 if there are even 3 created
  // 2. Read all surveys created for this team
  // 3. Show which survey is currently being used by this team
  // 4. Have an info icon to hover or open a modal to show the questions for any given survey
  // 5. Do I want the option to delete past surveys?

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
          <TableHeaders tableHeaders={["Survey", "Team Health Score", "No. of Respondents"]} />
          <Table.Body>
            {React.Children.toArray(
              surveyResults?.map((result: any) => {
                return (
                  <Table.Row>
                    <Table.Cell>{result.docId}</Table.Cell>
                    <Table.Cell>{result.score}</Table.Cell>
                    <Table.Cell>{result.submissionCount}</Table.Cell>
                  </Table.Row>
                );
              })
            )}
          </Table.Body>
        </Table>
        <CreateButton
          buttonLabel="Personalise Survey"
          title="Personalise your survey"
          text="Create a new survey and personalise your questions to better suit your team needs."
          iconName="file alternate outline"
          routeLink={`/teams/${teamId}/create-survey`}
        />
      </Container>
    </>
  );
};
