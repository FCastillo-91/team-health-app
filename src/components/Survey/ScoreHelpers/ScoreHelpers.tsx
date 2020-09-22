import { Answer } from "../SurveyPage";

export const getScores = (answers: Answer[]) => {
  return answers.map((item) => item.score);
};

export const getAverageScore = (scores: number[]) => {
  return scores.reduce((a: number, b: number) => a + b, 0) / scores.length;
};

export const calculateAverageScore = (answers: Answer[]) => {
  const scores = getScores(answers);
  return getAverageScore(scores);
};
