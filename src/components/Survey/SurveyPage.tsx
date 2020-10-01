import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import { Question } from "./Question/Question";
import { getTeamSurvey } from "../../api/surveys/readSurvey.api";
import { addAnswers } from "../../api/surveyResults/createSurveyResult.api";

export interface Survey {
  team: string;
  code: string;
  survey: string;
  questions: string[];
}

export interface Answer {
  question_id: string;
  question: string;
  score: number;
}

export const SurveyPage = () => {
  const { teamId } = useParams();

  const [survey, setSurvey] = useState<Survey | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const history = useHistory();

  const answerQuestion = (answer: Answer) => {
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

  const getValueForQuestion = (questionId: string) => {
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
    getTeamSurvey(teamId).then((teamSurvey) => {
      setSurvey(teamSurvey);
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
      <h1>{`${survey?.team} Team Health Survey`}</h1>
      {survey?.questions?.map((question: any, index: any) => {
        return (
          <div>
            <Question
              question={question.question}
              key={index}
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
      <Button disabled={answers.length !== survey.questions.length} onClick={() => submitAnswers()}>Submit</Button>
    </Container>
  );
};
