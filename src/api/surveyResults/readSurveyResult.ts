import {resultsCollectionRef} from "./createSurveyResult";

export const getAllResultsDataPerTeam = async (teamId: string) => {
  const monthlyTeamResults = await resultsCollectionRef()
    .where("team", "==", `${teamId}`)
    .get();
  if (monthlyTeamResults) {
    return monthlyTeamResults.docs.map((doc) => {
      const { date, team, submissionCount, score } = doc.data();
      return {
        date,
        team,
        submissionCount,
        score,
        docId: doc.id,
      };
    });
  }
};

export const getScoresPerTeam = async (teamId: string) => {
  const results = await getAllResultsDataPerTeam(teamId);
  if (results) {
    results.map((result) => {
      return result.score;
    });
  }
};
