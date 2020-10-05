import * as React from "react";
import { useEffect, useState } from "react";
import { PageHeader } from "../utils/PageHeader/PageHeader";
import {Button, Container} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Question } from "../TeamPage/TeamPage";
import { getTeamSurvey } from "../../api/surveys/readSurvey.api";
import { NewQuestion } from "../Survey/CreateSurvey/NewQuestion/NewQuestion";
import {addQuestionsToSurvey} from "../../api/surveys/createSurvey.api";
import {updateTeamSurvey} from "../../api/teams/updateTeam.api";

export const EditQuestions = () => {
  const { teamId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [surveyId, setSurveyId] = useState();

  const handleSubmit = () => {
    addQuestionsToSurvey(teamId, questions)
    updateTeamSurvey(teamId)
    console.log(`${questions} added to survey`);
  }

  const handleInputChange = (questionText: string, index: number) => {
    const updatedQuestions = [] as any;
    questions.forEach((question, i) => {
      if (index === i) {
        updatedQuestions.push(questionText);
      } else {
        updatedQuestions.push(question);
      }
    });
    setQuestions(updatedQuestions);
  };

  const handleDelete = (index: number) => {
    const updatedQuestionView = questions.filter((question, i) => {
      return index !== i;
    });
    setQuestions(updatedQuestionView);

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
            onChange={handleInputChange}
            onDelete={handleDelete}
          />
        );
      })}
      <Button>Cancel</Button>
      <Button onClick={handleSubmit}>Save</Button>
    </Container>
  );
};
