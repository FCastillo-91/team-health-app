import { collectionTeamsRef } from "../ref.api";

export interface Team {
  code: string;
  name: string;
  id: string;
  survey: string;
}

export const getAllTeams = async () => {
  const snapshot = await collectionTeamsRef().get();
  return snapshot.docs.map((doc) => {
    const { name, code, id, survey } = doc.data();
    return { name, code, id, survey }; //TODO refactor
  });
};

export const getTeam = async (id: string): Promise<Team> => {
  const doc = await collectionTeamsRef().doc(id).get();
  return (doc.data() as Team) || null;
};
