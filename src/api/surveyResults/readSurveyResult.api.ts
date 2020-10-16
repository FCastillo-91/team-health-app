import { resultsCollectionRef } from "./createSurveyResult.api";

export interface MonthlyTeamSurveyResults {
  id: string;
  score: number;
  submissionCount: number;
  team: string;
  date?: Date;
}

export const getAllResultsDataPerTeam = async (teamId: string) => {
  console.log("Get Team Results");
  const monthlyTeamResults = await resultsCollectionRef()
    .where("team", "==", `${teamId}`)
    .get();
  if (monthlyTeamResults) {
    return monthlyTeamResults.docs.map((doc) => {
      const { score, submissionCount, team } = doc.data();
      return {
        score: score,
        submissionCount: submissionCount,
        team: team,
        id: doc.id,
      };
    });
  }
};
