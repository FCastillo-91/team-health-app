import {resultsCollectionRef} from "./createSurveyResult.api";

export const getAllResultsDataPerTeam = async (teamId: string) => {
  const monthlyTeamResults = await resultsCollectionRef()
    .where("team", "==", `${teamId}`)
    .get();
  if (monthlyTeamResults) {
    return monthlyTeamResults.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  }
};
