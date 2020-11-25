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

  const answerQuestion = (answer: Answer) => {
    if (answers.find((item) => item.question_id === answer.question_id)) {
      setAnswers((previousAnswers) =>
        previousAnswers.map((item) => {
          if (item.question_id === answer.question_id) {
            return answer;
          } else {
            return item;
          }
        })
      );
    } else {
      setAnswers((previousAnswers) => [...previousAnswers, answer]);
    }
  };

  const getValueForQuestion = (questionId: string = "") => {
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

  if (isLoading) {
    return <Load />;
  }
  if (!survey) {
    return <>Survey Not Found</>;
  }

  return (
    <Container>
      <h1>{`${survey?.team} Team Health Survey`}</h1>
      <h4>
        Please score each question with how strongly you agree 1 being the
        lowest and 5 being the highest.
      </h4>

      {survey?.questions.length === 0 ? (
        <p>Sorry no questions available right now</p>
      ) : (
        survey?.questions?.map((question, index) => {
          return (
            <div key={index} style={{ marginBottom: "20px" }}>
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
        })
      )}
      {survey?.questions.length > 0 && (
        <Button
            size="big"
            color='blue'
            style={{marginBottom: '20px'}}
          disabled={answers.length !== survey?.questions.length}
          onClick={() => submitAnswers()}
        >
          Submit
        </Button>
      )}
    </Container>
  );
};
