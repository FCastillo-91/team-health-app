import { database } from "../config/database";

const surveysCollectionRef = () => database.collection("surveys");
const surveyRef = (id: any) => surveysCollectionRef().doc(id);
const surveyQuestionsCollectionRef = (surveyId: string) =>
  surveyRef(surveyId).collection("questions");

export const createSurveysRefId = (teamId: string) => {
  return `${teamId}_custom_${new Date()}`;
};

export const createSurveyDoc = async (customSurveyId: string) => {
  await surveyRef(customSurveyId).set({
    title: customSurveyId,
  });
};

export const addQuestionsToSurvey = async (
  teamId: string,
  questions: string[]
) => {
  const customSurveyId = createSurveysRefId(teamId);
  await createSurveyDoc(customSurveyId);

  const batch = database.batch();
  questions.forEach((question, index: number) => {
    console.log(`Adding ${question}`);

    const ref = surveyQuestionsCollectionRef(customSurveyId).doc();
    batch.set(ref, { question: question, order: index + 1 });
  });
  await batch.commit();
};
