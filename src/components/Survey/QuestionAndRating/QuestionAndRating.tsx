import React from "react";
import { Container, Rating, Segment } from "semantic-ui-react";

export interface QuestionAndRatingProps {
  question: string;
  onChange?: (rating: number) => void;
  value: number;
}
export const QuestionAndRating = ({
  question,
  onChange = () => {},
  value,
}: QuestionAndRatingProps) => {
  function handleChangeOnRate(event: any, { rating }: any) {
    onChange(rating);
  }

  return (
    <Container textAlign="left" style={{ padding: "10px" }}>
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
