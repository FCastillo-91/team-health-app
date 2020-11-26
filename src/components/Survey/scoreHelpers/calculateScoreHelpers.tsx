export const updateAverageScore = (
  scores: number[],
  submissionCount: number
) => {
  const sumScores = scores.reduce((a, b) => a + b, 0);
  const avg = sumScores / submissionCount;

  return parseFloat(avg.toFixed(3));
};
