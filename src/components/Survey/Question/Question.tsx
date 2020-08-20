import * as React from "react";
import { Container, Rating } from "semantic-ui-react";

type QuestionProps = { question: string };

export const Question = ({ question }: QuestionProps) => {
  return (
    <Container textAlign="left">
      <h4>{question}</h4>
      <Rating maxRating={5} defaultRating={2} icon="star" size="huge" />
    </Container>
  );
};
