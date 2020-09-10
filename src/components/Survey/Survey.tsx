import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import { Question } from "./Question/Question";
import { getSurveyForTeam } from "../../api/surveys/readSurvey.api";

export type Survey = Question[];

export interface Question {
  question: string;
}
export const Survey = () => {
  const { teamId } = useParams();

  const [survey, setSurvey] = useState<Survey | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSurveyForTeam(teamId).then((survey) => {
      setSurvey(survey);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <>Just Loading..</>;
  }
  if (!survey) {
    return <>Survey Not Found</>;
  }
  return (
    <Container>
      <h1>survey</h1>
      {survey.map((question, index) => {
        return <Question question={question.question} key={index} />;
      })}
      <Button as={Link} to="/survey/thanks">
        Submit
      </Button>
    </Container>
  );
};
