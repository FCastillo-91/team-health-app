import * as React from "react";
import { Container, Rating } from "semantic-ui-react";

export interface QuestionProps {
  question: string;
  onChange?: (rating: number) => void;
  value: number;
}
export const Question = ({
  question,
  onChange = () => {},
  value,
}: QuestionProps) => {

  function handleChangeOnRate(event: any, { rating }: any) {
    onChange(rating);
  }

  return (
    <Container textAlign="left" style={{ padding: "20px" }}>
      <h4>{question}</h4>
      <Rating
        value={value}
        onRate={handleChangeOnRate}
        maxRating={5}
        defaultRating={value}
        icon="star"
        size="huge"
      />
    </Container>
  );
};
