import { Team } from "../teams/readTeam.api";
import { database } from "../config/database";

export interface Question {
  question: string;
  id: string;
  order?: number;
}
export type Questions = Question[];

export interface TeamSurveyData {
  team: string;
  code: string;
  survey: string;
  questions: Questions;
}

export const collectionSurveysRef = () => database.collection("surveys");
export const collectionQuestionsRef = (id: any) =>
  collectionSurveysRef().doc(id).collection("questions");

export const getQuestions = async (surveyId: string): Promise<Questions> => {
  console.log("Get Questions");
  const questionRefs = collectionQuestionsRef(surveyId);
  const getAllQuestions = await questionRefs.orderBy("order").get();
  return getAllQuestions.docs.map((doc) => {
    const { question, order } = doc.data();
    return {
      id: doc.id,
      question,
      order,
    };
  });
};

export const getTeamSurvey = async (team: Team): Promise<TeamSurveyData> => {
  console.log("Get Team Survey");
  const surveyQuestions = await getQuestions(team.survey);
  return {
    team: team.name,
    code: team.code,
    survey: team.survey,
    questions: surveyQuestions,
  };
};
