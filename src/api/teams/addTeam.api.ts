import { database } from "../config/database";

export const teamsCollectionRef = () => database.collection("teams");
export const teamRef = (id: string) => teamsCollectionRef().doc(id);

export const addTeam = async (
  teamName: string,
  teamCode: string,
  teamSurvey: string
) => {
  await teamRef(teamCode).set({
    name: teamName,
    code: teamCode,
    survey: teamSurvey,
  });
};
