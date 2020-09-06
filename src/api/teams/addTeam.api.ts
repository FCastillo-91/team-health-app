import { ref } from "./teamrefs.api";
import { getAllTeams } from "./readTeam.api";

export const addTeam = (teamName: any, teamCode: any) => {
  getAllTeams().then((teams) => {
    const newId = `team-${teams.length + 1}`;

    ref("teams")
      .doc(newId)
      .set({
        name: teamName,
        code: teamCode,
      })
      .then(function () {
        console.log(`${teamName} created`);
      })
      .catch(function (error: any) {
        console.error("Error adding document: ", error);
      });
  });
};
