import { database } from "../config/database";

const surveysCollectionRef = () => database.collection("surveys");

const surveyRef = (id: any) => surveysCollectionRef().doc(id);

const surveyQuestionsCollectionRef = (surveyId: any) =>
  surveyRef(surveyId).collection("questions");

export const createSurveysRefId = (teamId: string) => {
  return `${teamId}_custom_survey`;
};

export const addQuestionsToSurvey = async (teamId: string, questions: any) => {
  const customSurveyId = createSurveysRefId(teamId);
  await createSurveyDoc(customSurveyId);
  const batch = database.batch();
  questions.forEach((question: any, index: number) => {
    const ref = surveyQuestionsCollectionRef(customSurveyId).doc();
    batch.set(ref, { question: question, order: `${index + 1}` });
  });
  await batch.commit();
};

export const createSurveyDoc = (customSurveyId: string) => {
  return surveysCollectionRef().doc(customSurveyId).set({
    title: customSurveyId,
  });
};
