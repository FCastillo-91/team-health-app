import * as React from "react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CreateButton} from "../utils/CreateButton/CreateButton";
import {Container, Divider, Header, Segment, Table} from "semantic-ui-react";
import {PageHeader} from "../utils/PageHeader/PageHeader";
import {getAllResultsDataPerTeam} from "../../api/surveyResults/readSurveyResult";
import {GenerateTableHeaders} from "../utils/CreateTable/DataTable";
import {getTeam} from "../../api/teams/readTeam.api";
import {Survey} from "../Survey/SurveyPage";

export const TeamPage = () => {
  const { teamId } = useParams();
  const [surveyResults, setSurveyResults] = useState();
  const [isDefault, setIsDefault] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const hasDefaultSurvey = async () => {
    const team = await getTeam(teamId);
    if (team.survey !== "default_survey") {
      setIsDefault(false);
    }
  };

  useEffect(() => {
    getAllResultsDataPerTeam(teamId).then((results) => {
      setSurveyResults(results);
    });
    hasDefaultSurvey().then(() => {
      setIsLoading(false);
    });
  }, []);

  // 1. Add a table showing Surveys section only show last 3 if there are even 3 created
  // 2. Read all surveys created for this team

  // 4. Have an info icon to hover or open a modal to show the questions for any given survey

  return (
    <>
      <Container>
        <PageHeader iconLabel="user" content={`${teamId} Team Page`} />
        <Segment textAlign="left">
          {!isLoading && (
            <p>
              Your team has a <b>{isDefault ? "default" : "custom"}</b> survey
              assigned
            </p>
          )}
        </Segment>
        <Divider />
        <Header as="h3" textAlign="left">
          Survey Scores
        </Header>

        <Table celled>
          <GenerateTableHeaders
            tableHeaders={["Survey", "Team Health Score", "No. of Respondents"]}
          />
          <Table.Body>
            {surveyResults?.map((result: any, index: number) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{result.id}</Table.Cell>
                  <Table.Cell>{result.score}</Table.Cell>
                  <Table.Cell>{result.submissionCount}</Table.Cell>
                </Table.Row>
              );
            })}
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
