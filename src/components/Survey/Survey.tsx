import React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import { QuestionAndRating } from "./QuestionAndRating/QuestionAndRating";
import {
  getTeamSurvey,
  TeamSurveyData,
} from "../../api/surveys/readSurvey.api";
import { addAnswers } from "../../api/surveyResults/createSurveyResult.api";
import { Load } from "../utils/Loading/Loading";
import { getTeam } from "../../api/teams/readTeam.api";

export interface Answer {
  question_id: string;
  question: string;
  score: number;
}

export const Survey = () => {
  const { teamId } = useParams();

  const [survey, setSurvey] = useState<TeamSurveyData>();
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const history = useHistory();

  // TODO: remove any
  const answerQuestion = (answer: any) => {
    if (answers.find((item) => item.question_id === answer.question_id)) {
      setAnswers(
        answers.map((item) => {
          if (item.question_id === answer.question_id) {
            return answer;
          } else {
            return item;
          }
        })
      );
    } else {
      setAnswers([...answers, answer]);
    }
  };

  const getValueForQuestion = (questionId: string = '') => {
    const answer = answers.find((item) => item.question_id === questionId);
    if (answer) {
      return answer.score;
    }
    return 0;
  };

  const submitAnswers = async () => {
    await addAnswers(teamId, answers);
    history.push(`/survey/thanks`);
  };

  useEffect(() => {
    (async () => {
      const team = await getTeam(teamId);
      const teamSurvey = await getTeamSurvey(team);

      if (teamSurvey) {
        setSurvey(teamSurvey);
        setIsLoading(false);
      }
    })();
  }, [teamId]);

  if (isLoading) {
    return <Load />;
  }
  if (!survey) {
    return <>Survey Not Found</>;
  }

  return (
    <Container>
      <h1>{`${survey?.team} Team Health Survey`}</h1>
      {survey?.questions?.map((question, index) => {
        return (
          <div key={index}>
            <QuestionAndRating
              question={question.question}
              value={getValueForQuestion(question.id)}
              onChange={(score) =>
                answerQuestion({
                  question_id: question.id,
                  question: question.question,
                  score,
                })
              }
            />
          </div>
        );
      })}
      <Button
        disabled={answers.length !== survey?.questions.length}
        onClick={() => submitAnswers()}
      >
        Submit
      </Button>
    </Container>
  );
};
