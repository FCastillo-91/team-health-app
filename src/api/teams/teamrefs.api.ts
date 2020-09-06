import { database } from "../config/database";

export const ref = (path: string) => {
  return database.collection(path);
};
