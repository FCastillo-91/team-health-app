import { getTeam } from "../teams/readTeam.api";
import { collectionQuestionsRef, collectionSurveysRef } from "../ref.api";

export const getAllSurveys = async () => {
  const surveyRefs = collectionSurveysRef();
  const getAllSurveys = await surveyRefs.get();
  getAllSurveys.forEach((surveys) => {
    return surveys.data();
  });
};

export const getQuestions = async (surveyId: any) => {
  const questionRefs = collectionQuestionsRef(surveyId);
  const getAllQuestions = await questionRefs.get();
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
