import {Survey} from "../../components/Survey/Survey";
import {getTeam} from "../teams/readTeam.api";
import {collectionSurveysRef} from "../ref.api";

export const getSurvey = async (id: string): Promise<Survey> => {
  const snapshot = await collectionSurveysRef()
    .doc(id)
    .collection("questions")
    .get();
  return snapshot.docs.map((doc) => doc.data()) as Survey;
};

export const getSurveyForTeam = async (
  id: string
): Promise<Survey | undefined> => {
  const team = await getTeam(id);
  if (team) {
    return await getSurvey(team?.survey);
  }
};

//getSurvey
//get reference to the Survey
//get reference to Questions
//.get the survey
//.get the questions
//join into an object
//refactor types
