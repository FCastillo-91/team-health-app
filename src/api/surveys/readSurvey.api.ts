import { getTeam } from "../teams/readTeam.api";
import { database } from "../config/database";

export const collectionSurveysRef = () => {
  return database.collection("surveys");
};

export const collectionQuestionsRef = (id: any) => {
  return collectionSurveysRef().doc(id).collection("questions");
};

export const getSurveyType = async () => {
  const surveyRefs = collectionSurveysRef();
  const getAllSurveys = await surveyRefs.get();
  return getAllSurveys.docs.map((surveys) => {
    return surveys.data();
  });
};

export const getQuestions = async (surveyId: any) => {
  const questionRefs = collectionQuestionsRef(surveyId);
  const getAllQuestions = await questionRefs.orderBy("order").get();
  return getAllQuestions.docs.map((questions) => {
    return {
      id: questions.id,
      ...questions.data(),
    };
  });
};

export const getTeamSurvey = async (teamId: any) => {
  const team = await getTeam(teamId);
  if (team) {
    const surveyQuestions: any = await getQuestions(team?.survey);

    return {
      team: team?.name,
      code: team?.code,
      survey: team?.survey,
      questions: surveyQuestions,
    };
  }
};
