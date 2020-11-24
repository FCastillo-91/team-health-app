import {database} from "../config/database";

export const teamsCollectionRef = () => database.collection("teams");
export const teamRef = (id: string) => teamsCollectionRef().doc(id);

export const updateTeamSurvey = async (teamId: string, surveyId: string) => {
         await teamRef(teamId).update({
           survey: surveyId,
         });
       };
