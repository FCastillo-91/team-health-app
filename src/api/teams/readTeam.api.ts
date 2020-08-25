import { teamRef } from "./teamrefs.api";

export interface Team {
  code: string;
  name: string;
}

const resolveRef = (ref: any) => {
  return new Promise((resolve, reject) => {
    const onData = (snap: any) => resolve(snap.val());
    const onError = (error: string) => reject(error);

    ref.on("value", onData, onError);
  });
};

export const getAllTeams = async (): Promise<Team[]> => {
  const teamsObj = (await resolveRef(teamRef())) as any;
  return Object.entries(teamsObj).map(([key, value]) => value) as Team[];
};
