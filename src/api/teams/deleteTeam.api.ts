import { database } from "../config/database";

const collectionTeamsRef = () => database.collection("teams");
const teamRef = (id: string) => collectionTeamsRef().doc(id);

export const deleteTeam = async (teamCode: string) => {
  await teamRef(teamCode).delete();
};
