import { collectionTeamsRef } from "../ref.api";

export const deleteTeam = (teamCode: any) => {
  collectionTeamsRef()
    .doc(teamCode)
    .delete()
    .then(function () {
      console.log("Team successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
};
