import { database } from "../config/database";
import { date } from "../../components/utils/dateHelpers/dateHelpers";
import { Answer } from "../../components/Survey/Survey";
import { updateAverageScore } from "../../components/Survey/scoreHelpers/calculateScoreHelpers";

export interface ResultsData {
  team: string;
  submissionCount: number;
  avgScore: number;
  date: Date;
  scores: number[];
}

export const resultsCollectionRef = () => database.collection("results");
const resultRef = (id: string) => resultsCollectionRef().doc(id);
const answersCollectionRef = (resultId: string) =>
  resultRef(resultId).collection("answers");

export const createResultsRefId = (teamId: string) => {
  return `${teamId}-${date()}`;
};

export const addAnswers = async (
  teamId: string,
  answers: Answer[],
  avgScore: number
) => {
  console.log("Adding Answers");

  const resultsId = createResultsRefId(teamId);
  const result = await resultRef(resultsId).get();

  const createScoresArray = (firstAvgScore) => {
    const firstArry: number[] = [];
    firstArry.push(firstAvgScore);
    return firstArry;
  };
  if (!result.exists) {
    await createResultsDoc(teamId, {
      avgScore: avgScore,
      submissionCount: 1,
      scores: createScoresArray(avgScore),
    });
  } else {
    const { submissionCount, scores } = (await result.data()) as ResultsData;
    const scoresArray: number[] = [...scores, avgScore];
    const updatedSubmissionCount = submissionCount + 1;
    const updatedAverageScore = await updateAverageScore(
      scoresArray,
      updatedSubmissionCount
    );

    await resultRef(resultsId).update({
      avgScore: updatedAverageScore,
      submissionCount: updatedSubmissionCount,
      scores: scoresArray,
    });
  }
  const batch = database.batch();
  answers.forEach((answer) => {
    const ref = answersCollectionRef(resultsId).doc();
    batch.set(ref, answer);
  });
  await batch.commit();
};

export const createResultsDoc = async (teamId: string, data: any = {}) => {
  const resultsId = createResultsRefId(teamId);

  return await resultsCollectionRef()
    .doc(resultsId)
    .set({
      date: new Date(),
      team: teamId,
      ...data,
    });
};
