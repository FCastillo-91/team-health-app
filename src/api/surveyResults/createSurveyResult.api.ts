import { database } from "../config/database";
import { date } from "../../components/utils/dateHelpers/dateHelpers";
import { Answer } from "../../components/Survey/Survey";
import {
  calculateFirstAverageScore,
  newSubmissionCount,
  updateAverageScore,
} from "../../components/Survey/scoreHelpers/calculateScoreHelpers";

export interface ResultsData {
  team: string;
  submissionCount: number;
  score: number;
  date: Date;
}

export const resultsCollectionRef = () => database.collection("results");
const resultRef = (id: string) => resultsCollectionRef().doc(id);
const answersCollectionRef = (resultId: string) =>
  resultRef(resultId).collection("answers");
const answerRef = (answerId: string, resultId: string) =>
  answersCollectionRef(resultId).doc(answerId);

export const createResultsRefId = (teamId: string) => {
  return `${teamId}-${date()}`;
};

export const addAnswers = async (teamId: string, answers: Answer[]) => {
  console.log("Adding Answers");

  const resultsId = createResultsRefId(teamId);
  const result = await resultRef(resultsId).get();
  const firstAvgScore = calculateFirstAverageScore(answers);

  if (!result.exists) {
    await createResultsDoc(teamId, {
      score: firstAvgScore,
      submissionCount: 1,
    });
  } else {
    const { score, submissionCount } = result.data() as ResultsData;
    const updatedAverageScore = updateAverageScore(
      score,
      submissionCount,
      firstAvgScore
    );
    const updatedSubmissionCount = newSubmissionCount(submissionCount);

    await resultRef(resultsId).update({
      score: updatedAverageScore,
      submissionCount: updatedSubmissionCount,
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
