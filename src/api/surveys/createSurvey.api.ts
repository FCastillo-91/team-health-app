import { database } from "../config/database";
import { Question } from "./readSurvey.api";

const surveysCollectionRef = () => database.collection("surveys");
const surveyRef = (id: any) => surveysCollectionRef().doc(id);
const surveyQuestionsCollectionRef = (surveyId: any) =>
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
  console.log("Adding Questions");
  const customSurveyId = createSurveysRefId(teamId);
  await createSurveyDoc(customSurveyId);

  const batch = database.batch();
  await questions.forEach((question: string, index: number) => {
    const ref = surveyQuestionsCollectionRef(customSurveyId).doc();
    batch.set(ref, { question: question, order: index + 1 });
  });
  await batch.commit();

};
