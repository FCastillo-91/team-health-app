import * as React from "react";
import { Button, Divider, Input } from "semantic-ui-react";

export interface QuestionInputProps {
  index: number;
  inputValue: any;
  onChange: (inputValue: string, e: any) => void;
  onDelete: (index: number) => void;
}

export const QuestionInput = ({
  index,
  inputValue,
  onChange,
  onDelete,
}: QuestionInputProps) => {
  const handleInputChange = (event: any, index: number) => {
    onChange(event.target.value, index);
  };

  const handleDelete = (index: number) => {
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