import * as React from "react";
import { useEffect, useState } from "react";
import { PageHeader } from "../utils/PageHeader/PageHeader";
import { Container } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Question } from "../TeamPage/TeamPage";
import { getTeamSurvey } from "../../api/surveys/readSurvey.api";
import { NewQuestion } from "../Survey/CreateSurvey/NewQuestion/NewQuestion";

export const EditQuestions = () => {
  const { teamId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [surveyId, setSurveyId] = useState();

  const onChange = () => {
    console.log("Changing");
  };

  const onDelete = () => {
    console.log("Deleting");
  };

  useEffect(() => {
    getTeamSurvey(teamId).then((results) => {
      setQuestions(results?.questions);
      setSurveyId(results?.survey);
    });
  }, []);

  return (
    <Container>
      <PageHeader iconLabel="edit" content={`Edit ${surveyId}`} />
      {questions?.map((question, index) => {
        return (
          <NewQuestion
            key={index}
            index={index}
            inputValue={question.question}
            onChange={() => {}}
            onDelete={() => {}}
          />
        );
      })}
    </Container>
  );
};
