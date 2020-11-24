import { database } from "../config/database";
import { v4 as uuid } from "uuid";
import { updateTeamSurvey } from "../teams/updateTeam.api";

const surveysCollectionRef = () => database.collection("surveys");
const surveyRef = (id: string) => surveysCollectionRef().doc(id);
const surveyQuestionsCollectionRef = (surveyId: string) =>
  surveyRef(surveyId).collection("questions");

export const createSurveysRefId = (teamId: string) => {
  const uniqueId: string = uuid();
  return `${teamId}_custom_${uniqueId}`;
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
  await updateTeamSurvey(teamId, customSurveyId);

  const batch = database.batch();
  questions.forEach((question, index: number) => {
    console.log(`Adding ${question}`);

    const ref = surveyQuestionsCollectionRef(customSurveyId).doc();
    batch.set(ref, { question: question, order: index + 1 });
  });
  await batch.commit();
};
