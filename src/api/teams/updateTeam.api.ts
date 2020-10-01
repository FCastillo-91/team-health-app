import { database } from "../config/database";
import { createSurveysRefId } from "../surveys/createSurvey.api";

export const teamsCollectionRef = () => database.collection("teams");
export const teamRef = (id: string) => teamsCollectionRef().doc(id);

export const updateTeamSurvey = async (teamId: string) => {
  const surveyId = createSurveysRefId(teamId);
  await teamRef(teamId).update({
    survey: surveyId,
  });
};

