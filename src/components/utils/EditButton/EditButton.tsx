import React from "react";
import {Button} from "semantic-ui-react";

export interface EditButtonProps {
  onClick: (id: string) => void;
}
export const EditButton = ({
  onClick = (id: string) => {},
}: EditButtonProps) => {
  function handleEdit(event: any, { id }: any) {
    onClick(id);
  }
  return <Button icon="edit" onClick={handleEdit} />;
};