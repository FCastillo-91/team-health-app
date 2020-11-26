import { resultsCollectionRef } from "./createSurveyResult.api";

export interface MonthlyTeamSurveyResults {
  id: string;
  avgScore: number;
  submissionCount: number;
  team: string;
  date?: Date;
  scores: number[];
}

export const getAllResultsDataPerTeam = async (teamId: string) => {
  console.log("Get Team Results");
  const monthlyTeamResults = await resultsCollectionRef()
    .where("team", "==", `${teamId}`)
    .get();
  if (monthlyTeamResults) {
    return monthlyTeamResults.docs.map((doc) => {
      const { avgScore, submissionCount, team, scores } = doc.data();
      return {
        avgScore,
        submissionCount,
        team,
        id: doc.id,
        scores,
      };
    });
  }
};
