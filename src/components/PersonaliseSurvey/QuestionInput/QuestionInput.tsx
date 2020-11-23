import React from "react";
import { Button, Divider, Input } from "semantic-ui-react";
import { FormEvent } from "react";

export interface QuestionInputProps {
  index: number;
  inputValue: string;
  onChange: (inputValue: string, index: number) => void;
  onDelete: (index: number) => void;
  name?: string;
  disableButton?: boolean;
}

export const QuestionInput = ({
  index,
  inputValue,
  onChange,
  onDelete,
  name,
  disableButton,
}: QuestionInputProps) => {
  const handleInputChange = (
    event: FormEvent<HTMLInputElement>,
    index: number
  ) => {
    onChange(event.currentTarget.value, index);
  };

  const handleDelete = (index: number) => {
    onDelete(index);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 4 }}>
          <Input
            fluid
            name={name}
            label={`Question ${index + 1}`}
            labelPosition="left"
            placeholder="Type question..."
            value={inputValue}
            onChange={(e) => handleInputChange(e, index)}
          />
        </div>
        <div style={{ flexGrow: 0 }}>
          <Button
            onClick={(e) => handleDelete(index)}
            icon="delete"
            disabled={disableButton}
          />
        </div>
      </div>
      <Divider />
    </>
  );
};
