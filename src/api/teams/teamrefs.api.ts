import { database } from "../../config/database";

const ref = (path: string) => {
  return database.ref().child(path);
};
export const teamRef = () => {
  return ref("teams");
};
