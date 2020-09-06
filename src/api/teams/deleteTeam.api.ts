import { ref } from "./teamrefs.api";

export const deleteTeam = (teamId: any) => {
  ref("teams")
    .doc(teamId)
    .delete()
    .then(function () {
      console.log("Team successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};
