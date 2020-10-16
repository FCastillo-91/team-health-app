import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CreateButton } from "../utils/CreateButton/CreateButton";
import { Container, Divider, Header, Segment, Table } from "semantic-ui-react";
import { PageHeader } from "../utils/PageHeader/PageHeader";
import { getAllResultsDataPerTeam } from "../../api/surveyResults/readSurveyResult.api";
import { GenerateTableHeaders } from "../utils/CreateTable/DataTable";
import { getTeam } from "../../api/teams/readTeam.api";
import { getTeamSurvey, QuestionsData } from "../../api/surveys/readSurvey.api";

export const TeamAdmin = () => {
  const { teamId } = useParams();
  const [surveyResults, setSurveyResults] = useState();
  const [isDefault, setIsDefault] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [surveyQuestions, setSurveyQuestions] = useState<QuestionsData[]>([]);

  useEffect(() => {
    (async () => {
      const team = await getTeam(teamId);

      if(!team) return; //display error not team exist

      const teamSurvey = await getTeamSurvey(team);
      const teamResults = await getAllResultsDataPerTeam(teamId);

      if (team?.survey !== "default_survey") {
        setIsDefault(false);
      }

      if (teamSurvey) {
        setSurveyQuestions(teamSurvey?.questions);
      }

      if (teamResults) {
        setSurveyResults(teamResults);
      }
      setIsLoading(false);
    })();
  }, [teamId]);

  return (
    <>
      <Container>
        <PageHeader
          iconLabel="heartbeat"
          content={`${teamId} Team Health Page`}
        />
        <Segment textAlign="left">
          {!isLoading && (
            <p>
              Your team has a <b>{isDefault ? "default" : "custom"}</b> survey
              assigned
            </p>
          )}
          <p>Need a reminder of your current survey questions?</p>
          {surveyQuestions?.map((question: QuestionsData, index) => {
            return <li key={index}>{question.question}</li>;
          })}
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
                  <Table.Cell>{result.score.toFixed(2)}</Table.Cell>
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
