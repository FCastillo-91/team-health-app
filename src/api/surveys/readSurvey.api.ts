import {Team} from "../teams/readTeam.api";
import {database} from "../config/database";

export interface QuestionsData {
  question: Question;
  order?: number;
  id: string;
}

export interface Question {
  question: string
}

export const collectionSurveysRef = () => database.collection("surveys");
export const collectionQuestionsRef = (id: any) =>
  collectionSurveysRef().doc(id).collection("questions");

export const getSurveyType = async () => {
  console.log("Get Survey Type");
  const surveyRefs = collectionSurveysRef();
  const getAllSurveys = await surveyRefs.get();
  return getAllSurveys.docs.map((surveys) => {
    return surveys.data();
  });
};

export const getQuestions = async (surveyId: string) => {
  console.log("Get Questions");
  const questionRefs = collectionQuestionsRef(surveyId);
  const getAllQuestions = await questionRefs.orderBy("order").get();
  return getAllQuestions.docs.map((questions) => {
    return {
      id: questions.id,
      ...questions.data(),
    };
  });
};

export const getTeamSurvey = async (team: Team) => {
  console.log("Get Team Survey");
  const surveyQuestions = await getQuestions(team.survey) as QuestionsData[];
  return {
    team: team.name,
    code: team.code,
    survey: team.survey,
    questions: surveyQuestions,
  };
};
