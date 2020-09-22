import { database } from "../config/database";

export const teamsCollectionRef = () => database.collection("teams");
export const teamRef = (id: string) => teamsCollectionRef().doc(id);

export const addTeam = (teamName: any, teamCode: any, teamSurvey: any) => {
  teamRef(teamCode)
    .set({
      name: teamName,
      code: teamCode,
      survey: teamSurvey,
    })
    .then(function () {
      console.log(`${teamName} created`);
    })
    .catch(function (error: any) {
      console.error("Error adding document: ", error);
    });
};
