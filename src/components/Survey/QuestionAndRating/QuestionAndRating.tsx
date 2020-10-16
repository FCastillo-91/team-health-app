import * as React from "react";
import { Container, Rating, Segment } from "semantic-ui-react";
import { Question } from "../../../api/surveys/readSurvey.api";

export interface QuestionAndRatingProps {
  question: Question;
  onChange?: (rating: number) => void;
  value: number;
}
export const QuestionAndRating: React.FC<QuestionAndRatingProps> = ({
  question,
  onChange = () => {},
  value,
}) => {
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
