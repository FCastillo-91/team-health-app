import { collectionTeamsRef } from "../ref.api";

export const deleteTeam = (teamId: any) => {
  collectionTeamsRef()
    .doc(teamId)
    .delete()
    .then(function () {
      console.log("Team successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};
