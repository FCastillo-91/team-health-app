import { database } from "../config/database";
import { teamsCollectionRef } from "./addTeam.api";

export interface Team {
  code: string;
  name: string;
  id: string;
  survey: string;
}
export const collectionTeamsRef = () => database.collection("teams");
export const teamRef = (id: string) => teamsCollectionRef().doc(id);

export const getAllTeams = async () => {
  console.log("getALlTeams");
  const snapshot = await collectionTeamsRef().get();
  return snapshot.docs.map((doc) => {
    const { name, code, id, survey } = doc.data();
    return { name, code, id, survey }; // TODO refactor
  });
};

export const checkTeamCode = async (teamCode) => {
  const response = await getAllTeams();
  let found = false;
  // eslint-disable-next-line array-callback-return
  response.map((team) => {
    if (teamCode === team.code) {
      found = true;
    }
  });
  return found;
};

export const getTeam = async (id: string): Promise<Team> => {
  console.log("Get Team");
  const doc = await teamRef(id).get();
  return doc.data() as Team;
};
