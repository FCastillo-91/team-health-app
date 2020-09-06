import { ref } from "./teamrefs.api";

export interface Team {
  code: string;
  name: string;
  id: string;
}

export const getAllTeams = async () => {
  const snapshot = await ref("teams").get();
  return snapshot.docs.map((doc) => {
    return { name: doc.data().name, code: doc.data().code, id: doc.id }; //TODO refactor
  });
};
