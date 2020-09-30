import * as React from "react";
import {Button} from "semantic-ui-react";

export interface EditButtonProps {
  onClick: (id: string) => void;
}
export const EditButton = ({
  onClick = (id: string) => {},
}: EditButtonProps) => {
  function handleEdit(event: any, { id }: any) {
    console.log({ id });
    onClick(id);
  }
  return <Button icon="edit" onClick={handleEdit} />;
};


// const updateTeamListView = (code: any, teams) => {
//   const updateTeams = teams.filter((team) => {
//     return team.code !== code;
//   });
//   return setTeams(updateTeams);
// };
//
// const handleDeleteTeam = (code: any) => {
//   deleteTeam(code);
//   updateTeamListView(code);
// };
//
// const handleEditTeam = (code: any) => {
//   console.log(`Editing Team ${code}`);
// };