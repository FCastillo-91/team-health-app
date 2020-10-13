import { database } from "../config/database";
import { teamsCollectionRef } from "./addTeam.api";

const collectionTeamsRef = () => database.collection("teams");
const teamRef = (id: string) => teamsCollectionRef().doc(id);

export const deleteTeam = async (teamCode: string) => {
  await teamRef(teamCode).delete();
};
