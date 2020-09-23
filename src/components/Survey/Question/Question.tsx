import * as React from "react";
import { Container, Rating, Segment } from "semantic-ui-react";

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
    <Container textAlign="left" style={{padding: "10px"}}>
      <Segment raised>
        <h3>{question}</h3>
        <Rating
          value={value}
          onRate={handleChangeOnRate}
          maxRating={5}
          defaultRating={value}
          icon="star"
          size="huge"
        />
      </Segment>
    </Container>
  );
};
