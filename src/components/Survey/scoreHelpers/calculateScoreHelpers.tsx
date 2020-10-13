import { Answer } from "../Survey";

export const getScores = (answers: Answer[]) => {
  return answers.map((item) => item.score);
};

export const getAverageScore = (scores: number[]) => {
  return scores.reduce((a: number, b: number) => a + b, 0) / scores.length;
};

export const calculateFirstAverageScore = (answers: Answer[]) => {
  const scores = getScores(answers);
  return getAverageScore(scores);
};

export const newSubmissionCount = (submissionCount: number) => {
  return submissionCount + 1;
};

export const updateAverageScore = (score: number, submissionCount: number) => {
  const totalScore = score * submissionCount;
  const newTotalScore = totalScore + score;
  return newTotalScore / newSubmissionCount(submissionCount);
};
