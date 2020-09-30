import * as React from "react";
import { Button, Divider, Input } from "semantic-ui-react";

export interface NewQuestionProps {
  index: number;
  inputValue: string;
  onChange: (inputValue: string, e: any) => void;
  onDelete: (index: number) => void;
}

export const NewQuestion = ({
  index,
  inputValue,
  onChange,
  onDelete,
}: NewQuestionProps) => {
  const handleInputChange = (event: any, index: number) => {
      console.log({handleInputChange: event.target.value, index});
        onChange(event.target.value, index);
  };

  const handleDelete = (index: number) =>{
    onDelete(index);
  };

  return (
    <>
      <Input
        fluid
        name="questionTextInput"
        label={`Question ${index + 1}`}
        labelPosition="left"
        placeholder="Type question..."
        value={inputValue}
        onChange={(e) => handleInputChange(e, index)}
      />
      <Button onClick={(e) => handleDelete(index)} icon="delete" />
      <Divider />
    </>
  );
};
