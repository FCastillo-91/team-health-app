import { database } from "../config/database";
import { Answer } from "../../components/Survey/SurveyPage";
import { calculateAverageScore } from "../../components/Survey/ScoreHelpers/ScoreHelpers";
import { date } from "../../components/utils/dateHelpers/dateHelpers";

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
  const resultsId = createResultsRefId(teamId);
  const result = await resultRef(resultsId).get();
  const score = calculateAverageScore(answers);

  if (!result.exists) {
    await createResultsDoc(teamId, { score, submissionCount: 1 });
  } else {
    const data = result.data() as any;
    const totalScore = data.score * data.submissionCount;
    const newTotalScore = totalScore + score;
    const newSubmissionCount = data.submissionCount + 1;
    const averageScore = newTotalScore / newSubmissionCount;

    await resultRef(resultsId).update({
      score: averageScore,
      submissionCount: newSubmissionCount,
    });
  }
  const batch = database.batch();
  answers.forEach((answer) => {
    const ref = answersCollectionRef(resultsId).doc();
    batch.set(ref, answer);
  });
  await batch.commit();
};

export const createResultsDoc = (teamId: string, data: any = {}) => {
  const resultsId = createResultsRefId(teamId);

  return resultsCollectionRef()
    .doc(resultsId)
    .set({
      date: new Date(),
      team: teamId,
      ...data,
    });
};


